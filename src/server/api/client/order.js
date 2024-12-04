import express from "express"
import Stuffs from "server/models/stuffs"
import Orders from "server/models/orders"
import { asyncHandler } from "server/handlers"
import prettyPrice from "utils/prettyPrice"
import twilio from "twilio"
import uuid from "uuid"
import { ObjectID } from "bson"
import config from "shared/base"
const router = express.Router()

router.get(
  "/get-unique-code",
  asyncHandler(async (req, res) => {
    const result = await Stuffs.findOneAndUpdate(
      { fieldName: "orderCounter" },
      { $inc: { data: 1 } },
      { new: true },
    )

    const counter = parseInt((result || {}).data) || 0
    res.json({ counter })
  }),
)

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const order = req.body

    if (!order) throw new Error("Не переданы данные для заказа")

    order._id = new ObjectID().toString()

    const isAdmin = req.user && req.user.admin
    const idempotenceKey = uuid()
    const { confirmation, status, id } = await makePayment(
      order._id,
      idempotenceKey,
      order,
      isAdmin,
    )

    order.kassa = {
      status,
      id,
    }

    await new Orders(order).save()

    // отправить смс о заказе если не админ
    if (
      process.env.NODE_ENV === "production" &&
      (!req.user || (req.user && !req.user.admin))
    )
      sendSms(order)

    res.json({
      confirmation_url: confirmation.confirmation_url,
      orderId: order._id,
    })
  }),
)

function makePayment(orderId, idempotenceKey, order, isAdmin) {
  const YandexCheckout = require("yandex-checkout")({
    shopId: "",
    secretKey: "",
    timeout: 20000,
  })

  const customer = {
    phone: order.recipient.phone.replace(/[^\d]/g, ""),
  }

  if (order.recipient.name) customer.full_name === order.recipient.name

  // сделать для админа бесплатную доставку
  const deliveryPrice = isAdmin ? 0 : order.delivery.price || 0

  const amount = {
    value: order.totalPrice + deliveryPrice,
    currency: "RUB",
  }

  const items = order.items.map(({ name, count, totalPrice }) => ({
    description: name,
    quantity: count,
    amount: {
      value: totalPrice,
      currency: "RUB",
    },
    vat_code: "1",
    payment_mode: "full_prepayment",
    payment_subject: "commodity",
  }))

  const description = items.map(({ description }) => description).join(", ")

  const data = {
    amount,
    description,
    payment_method_data: {
      type: "bank_card",
    },
    confirmation: {
      type: "redirect",
      return_url: `${config.siteUrl}/order/${orderId}`,
    },
    capture: true,
    receipt: {
      customer,
      items,
    },
  }

  return YandexCheckout.createPayment(data, idempotenceKey)
}

router.get(
  "/yandex-kassa/get-payment-by-order-id/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params
    // find order
    const order = await Orders.findOne({ _id })
    if (!order || !order.kassa) throw new Error("The order not found")

    // get payment
    let payment
    try {
      payment = await getPayment(order.kassa.id)
    } catch (e) {
      return res.status(404).send()
    }

    // update payment status if need
    if (payment.status !== order.kassa.status)
      await Orders.updateOne(
        { _id },
        { $set: { "kassa.status": payment.status } },
      )

    res.json({
      code: order.code,
      paymentStatus: payment.status,
    })
  }),
)

function getPayment(paymentId) {
  const YandexCheckout = require("yandex-checkout")({
    shopId: "",
    secretKey: "",
    timeout: 20000,
  })

  return YandexCheckout.getPayment(paymentId)
}

function sendSms({ items, totalPrice }) {
  const body = `Zakaz ${prettyPrice(totalPrice)} RUB`
  const accountSid = "yoursid"
  const authToken = "youraccestoken"
  const client = new twilio(accountSid, authToken)

  const twilioPhone = ""
  const phones = []

  const promises = phones.map(to =>
    client.messages.create({
      body,
      to,
      from: twilioPhone,
    }),
  )

  Promise.all(promises).then(
    messages => {
      console.log("СМС для заказа отправлена")
    },
    err => console.error("Не получилось отправить СМС для заказа", err),
  )
}

export default router
