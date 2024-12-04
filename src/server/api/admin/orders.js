import express from "express"
import Orders from "server/models/orders"
import { asyncHandler, isAdmin } from "server/handlers"

const router = express.Router()

router.get(
  "/status=:status",
  isAdmin,
  asyncHandler(async (req, res) => {
    const match = {}
    const status = parseInt(req.params.status)

    if (typeof status === "number" && !Number.isNaN(status))
      match.status = status

    let orders = await Orders.find(match).sort({ createdAt: -1 }).exec()

    if (!req.user.accessList.includes("#a.orders.view.category.sp_phone")) {
      orders = orders.filter(
        order => !order.items.find(item => item.category === "sp_phone"),
      )
    }

    res.json(orders)
  }),
)

router.put(
  "/order/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("Order id not found")

    const data = req.body
    const diff = {}

    if (data.action) {
      if (data.action === "addComment") {
        const comment = {
          text: data.text,
          userName: req.user.username,
          userId: req.user._id,
          date: new Date().toISOString(),
        }

        diff.$push = { adminComments: comment }
      }
    } else {
      diff.$set = data
      // добавить в историю если изменился статус
      if (data.status) {
        diff.$push = {
          changingHistory: {
            $each: [
              {
                name: "status",
                value: data.status,
                date: new Date().toISOString(),
                author: {
                  name: req.user.username,
                  _id: req.user._id,
                },
              },
            ],
            $position: 0,
          },
        }
      }
    }

    await Orders.updateOne({ _id: id }, diff).exec()
    res.json(diff)
  }),
)

router.delete(
  "/order/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("Order id not found")

    await Orders.deleteOne({ _id: id })
    res.end()
  }),
)

// кол-во новых заказов
// отображается цифрой рядом с ссылкой "Заказы" в header
router.get(
  "/online-stats",
  isAdmin,
  asyncHandler(async (req, res) => {
    const match = {
      "status": 0,
      "recipient.auth.admin": {
        $exists: false,
      },
    }

    const orders = await Orders.countDocuments(match)
    res.json(orders)
  }),
)

export default router
