import React, { Component } from "react"
import styled from "styled-components"
import request from "utils/request"
import Result from "./result"
import Popup from "./popup"
import Recipient from "./recipient"
import { DELIVERY } from "utils/data/constants"

const ERRORS = {
  PHONE: {
    EMPTY: "Укажите номер телефона",
    WRONG: "Неверно указан номер телефона",
  },
}

const shops = [
  {
    payment: "shop:mebelwood",
    name: "В магазине MебельВуд",
    address:
      "Санкт-Петербург, Дальневосточный проспект, д.14 А, 1 этаж, секция 135",
  },
  {
    payment: "shop:mebelcity",
    name: "В магазине MебельСити",
    address: "Санкт-Петербург, ул. Мебельная, 1 этаж, секция 31",
  },
  {
    payment: "shop:mebelhouse",
    name: "В магазине MебельХаус",
    address:
      "Ленинградская область, п. Мурино, Привокзальная площадь 3Б, 2 этаж, секция 213",
  },
]

const initialState = {
  comment: "",
  //payment: "on-delivery",
  payment: "online",
  status: false,
  code: "",
  recipient: {
    email: "",
    phone: "",
    name: "",
    address: "",
  },
  errors: {
    email: "",
    phone: "",
    name: "",
    address: "",
  },
}

export default class Order extends Component {
  state = initialState

  getTotalPrice = items => {
    return items.reduce(
      (total, item) => total + item.totalPrice * item.count,
      0,
    )
  }

  getDeliveryPrice = items => {
    const delivery = DELIVERY.FURNITURE
    const furnitureItems = items.filter(item => item.category !== "sp_phone")
    const totalPrice = this.getTotalPrice(furnitureItems)

    if (!furnitureItems.length) return 0

    return totalPrice > 0 && totalPrice < delivery.MIN_FREE_PRICE
      ? delivery.PRICE
      : 0
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props
    const hasFurnitureItems = !!items.find(item => item.category !== "sp_phone")
    if (prevProps.items !== items) {
      if (items.length && !hasFurnitureItems)
        this.setState(_ => ({ payment: "on-delivery" }))
    }
  }

  render() {
    const { recipient, errors, comment, payment, status, code } = this.state
    const { items } = this.props
    const totalPrice = this.getTotalPrice(items)
    const deliveryPrice = this.getDeliveryPrice(items)
    const hasFurnitureItems = !!items.find(item => item.category !== "sp_phone")
    const hasElectronicsItems = !!items.find(
      item => item.category === "sp_phone",
    )

    return (
      <Block>
        <Header>Оформление заказа</Header>
        <Recipient
          recipient={recipient}
          errors={errors}
          change={this.changeInfo}
          validate={this.validate}
          phonePaste={this.phonePaste}
        />

        <Section>
          <Title>Срок доставки</Title>
          <Text>Под заказ 7-14 дней. В наличии 2-7 дней.</Text>
        </Section>

        {hasFurnitureItems && (
          <Section>
            <Title>Условия доставки мебели</Title>
            <Text>
              Доставка в пределах Санкт-Петербурга до подъезда заказчика, от{" "}
              {DELIVERY.FURNITURE.MIN_FREE_PRICE} рублей – бесплатно.
            </Text>
            <Text>
              Подъем - при наличии грузового или обычного лифта (1% от стоимости
              заказа, но не менее 500 руб.)
            </Text>
            <Text>
              При отсутствии (неисправности) лифта (50 рублей/этаж за каждую
              упаковку; 100 рублей/этаж крупногабаритные и тяжёлые упаковки
              например: шкаф, кровать, матрас.)
            </Text>
          </Section>
        )}

        {/*!!items.length &&
          <Section>
            <Title>Выбор оплаты</Title>
            <Label data-payment="on-delivery" onClick={this.changePayment}>
              <Radio data-checked={payment === "on-delivery"} />
              <div>При получении</div>
            </Label>
            {hasFurnitureItems && shops.map(shop =>
              <Label data-payment={shop.payment} onClick={this.changePayment} key={shop.payment}>
                <Radio data-checked={payment === shop.payment} />
                <div>
                  <div>{shop.name}</div>
                  <ShopAddress>{shop.address}</ShopAddress>
                </div>
              </Label>
            )}
          </Section>
        */}

        <Comment
          value={comment}
          placeholder="Можете оставить комментарий"
          rows="3"
          onChange={this.changeComment}
        />

        <Confirmation>
          <Result
            productCount={items.length}
            totalPrice={totalPrice}
            deliveryPrice={deliveryPrice}
            deliveryDefinedByManager={!hasFurnitureItems && hasElectronicsItems}
          />
          <PurchaseButton
            onClick={this.makeOrder}
            disabled={items.length === 0}
          >
            Подтвердить заказ
          </PurchaseButton>
        </Confirmation>
        {status && (
          <Popup
            status={status}
            code={code}
            close={this.closePopup}
          />
        )}
      </Block>
    )
  }

  closePopup = e => {
    this.setState({ status: false })
    window.scrollTo(0, 0)
    this.props.setOrder(null)
  }

  changeInfo = e => {
    let { value, name } = e.target
    if (name === "phone") {
      value = handlePhoneNumber(value, this.isPaste)
      if (this.isPaste) this.isPaste = false
      if (this.state.errors.phone && value.replace(/[^\d]+/g, "").length === 10)
        this.setState(state => ({ errors: { ...state.errors, phone: null } }))
    }

    this.setState(state => ({
      recipient: {
        ...state.recipient,
        [name]: value,
      },
    }))
  }

  changeComment = e => {
    const { value } = e.target

    this.setState(_ => ({
      comment: value,
    }))
  }

  validate = e => {
    const { name, value } = e.target
    if (name === "phone") {
      const error = validatePhoneOnBlur(value, this.state.errors.phone)
      if (error) this.setError(name, error)
    }
  }

  phonePaste = _ => {
    this.isPaste = true
  }

  setError = (name, error) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: error,
      },
    }))
  }

  changePayment = e => {
    const { payment } = e.target.dataset
    if (payment) this.setState(_ => ({ payment }))
  }

  makeOrder = async () => {
    const { items, actions, auth } = this.props
    const {
      recipient: { name, email, phone, address },
      comment,
      payment,
    } = this.state

    const phoneError = validatePhone(phone)
    if (phoneError) {
      window.scrollTo(0, 0)
      return this.setError("phone", phoneError)
    }

    this.setState({ status: "pending" })

    const recipient = {
      name,
      email,
      phone: "8 " + phone,
      address,
    }

    if (auth.isLogged) {
      recipient.auth = {
        userName: auth.username,
        userId: auth.userId,
      }
      if (auth.admin) {
        recipient.auth.admin = true
      }
    }

    const totalPrice = this.getTotalPrice(items)
    const deliveryPrice = this.getDeliveryPrice(items)

    const order = {
      status: 0,
      totalPrice,
      items,
      recipient,
      payment,
      delivery: {
        price: deliveryPrice,
        value: deliveryPrice === 0 ? "Бесплатная" : "",
      },
    }

    if (comment) order.comment = comment

    try {
      const code = getOrderCode()
      order.code = code
      const { orderId, confirmation_url } = await this.createOrder(order)
      actions.setTransactionId(orderId)
      this.redirectOnYandexKassa(confirmation_url)
      let orderIds = JSON.parse(window.localStorage.getItem("orderIds") || "")
      if (!orderIds || !Array.isArray(orderIds)) orderIds = []
      orderIds.push(orderId)
      window.localStorage.setItem("orderIds", JSON.stringify(orderIds))
      /*
      this.props.setOrder(order)
      this.setState({ ...initialState, status: "success", code })
      actions.removeAll()
      */
    } catch (e) {
      console.log("Произошла ошибка при добавлении заказа", e)
      this.setState({ status: "failure" })
    }
  }

  redirectOnYandexKassa(url) {
    window.location.href = url
  }

  getUniqueOrderCode() {
    return request({ url: "order/get-unique-code" })
  }

  createOrder(data) {
    return request({
      url: `order/`,
      method: "post",
      data,
    })
  }
}

function getOrderCode() {
  return getRandomInt(100, 1000) + "-" + getRandomString(3)
}

function getRandomString(len) {
  return Math.random().toString(36).substr(2, len)
}

function getRandomInt(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}

function handlePhoneNumber(value, isPaste) {
  let digits = value.trim().replace(/[^\d]+/g, "")
  // обрезаем до 10 цифр
  digits = isPaste
    ? // обрезаем со второй цифры
      // если телефон скопирован полностью c +7|8
      digits.substr(1, 10)
    : digits.substr(0, 10)

  let prettyPhone = ""
  for (let i = 0; i < digits.length; ++i) {
    prettyPhone += digits[i]
    if (i === 2 || i === 5 || i === 7) prettyPhone += " "
  }

  return prettyPhone.trim()
}

function validatePhoneOnBlur(value, hadError) {
  /* Замечание: функция не выдает ошибку, если было просто focus и blur на input без ввода значения */

  const len = value.replace(/[^\d]+/g, "").length
  if (!len && hadError) return ERRORS.PHONE.EMPTY
  else if (len && len !== 10) return ERRORS.PHONE.WRONG
}

function validatePhone(value) {
  const len = value.replace(/[^\d]+/g, "").length
  if (!len) return ERRORS.PHONE.EMPTY
  else if (len !== 10) return ERRORS.PHONE.WRONG
}

const Block = styled.div`
  width: 50%;
  @media (max-width: 1023px) {
    width: 100%;
    margin-top: 20px;
  }
`

const Header = styled.h2`
  font-size: 18px;
  margin: 0;
  padding: 15px 0;
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
`

const Section = styled.section`
  margin-bottom: 20px;
`

const Title = styled.h3`
  font-size: 11px;
  margin: 0 0 2px;
  text-transform: uppercase;
`

const Text = styled.div`
  margin-bottom: 6px;
`

const Comment = styled.textarea`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 20px;
`

const Confirmation = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid #ddd;
  padding: 10px 0;

  @media (max-width: 650px) {
    flex-flow: column nowrap;
  }
`

const PurchaseButton = styled.button`
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid transparent;
  padding: 14px 30px;
  background-image: url(shop/textures/1.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  font-size: 18px;
  color: white;
  font-weight: 600;
  align-self: flex-end;
  ${props =>
    props.disabled
      ? "background-color: #999;"
      : `
      background-color: #00A0FF;
      border-color: #135076;
      cursor: pointer;
      &:hover {
        background-color: #008ee3;
      }
    `}

  @media (max-width: 650px) {
    width: 100%;
  }
`

const ShopAddress = styled.div`
  color: #777;
`

const Radio = styled.div`
  position: relative;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 10px;
  height: 20px;
  width: 20px;

  &[data-checked="true"] {
    border-color: #be0001;
    :after {
      background-color: #be0001;
    }
  }

  &:after {
    content: "";
    display: block;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
  }
`

const Label = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px dashed #ddd;
  padding: 14px 0px;

  &:hover {
    background-color: #efefef;
  }

  & * {
    pointer-events: none;
    line-height: 15px;
  }
`
