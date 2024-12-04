import express from "express"
import Items from "server/models/items"
import Sets from "server/models/sets"
import Stuffs from "server/models/stuffs"
import { asyncHandler, isAdmin } from "server/handlers"
const router = express.Router()

// список последних созданный коллекций
router.get(
  "/list",
  isAdmin,
  asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 15
    const skip = parseInt(req.query.skip) || 0
    const result = await Sets.find({})
      .sort({ "created.date": -1 })
      .limit(limit + 1)
      .skip(skip)
      .exec()

    res.json(result)
  }),
)

// поиск коллекций
router.get(
  "/search",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { name, productId } = req.query
    const match = {}

    if (name) match.name = { $regex: name, $options: "i" }
    else if (productId) match.productIds = productId
    else return res.json([])

    const result = await Sets.find(match)
      .select("name created")
      .limit(40)
      .exec()

    res.json(result)
  }),
)

// получить коллекцию + продукты
router.get(
  "/set/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("A bad set id")

    const set = await Sets.findOne({ _id: id })

    if (!set) return res.status(404).send()

    const products = await Items.find({ _id: { $in: set.productIds } })
      .select("category base doneStatus")
      .exec()

    res.json({ set, products })
  }),
)

// создать коллекции
router.post(
  "/set",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { name, kind } = req.body

    if (!name) throw new Error("A bad set name")

    const result = await Stuffs.findOneAndUpdate(
      { fieldName: "collectionCounter" },
      { $inc: { data: 1 } },
      { new: true },
    )

    const counter = result.data

    const data = {
      name: name + "-" + counter,
      kind,
      productIds: [],
      created: {
        author: req.user.username,
        authorId: req.user._id,
        date: new Date().toISOString(),
      },
    }

    const set = await new Sets(data).save()
    res.json(set)
  }),
)

// изменить (добавить\удалить) продукты в коллекции
router.put(
  "/set/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("A bad set id")

    if (!req.body) throw new Error("No body")

    const { kind, productIds } = req.body

    if (!Array.isArray(productIds))
      throw new Error("ProductIds must be an array")

    await Sets.updateOne(
      { _id: id },
      {
        $set: {
          kind,
          productIds,
          updated: {
            author: req.user.username,
            authorId: req.user._id,
            date: new Date().toISOString(),
          },
        },
      },
    )

    res.send("The set has been changed")
  }),
)

router.delete(
  "/set/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("A bad set id")

    await Sets.deleteOne({ _id: id })
    res.send("The set has been removed")
  }),
)

export default router
