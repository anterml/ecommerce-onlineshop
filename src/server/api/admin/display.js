import express from "express"
import Items from "server/models/items"
import Stuffs from "server/models/stuffs"
import { asyncHandler, isAdmin } from "server/handlers"
import setMainPageCache from "server/cache/set/main-page"
import { ObjectID } from "bson"
const router = express.Router()

// список последних созданных страниц
router.get(
  "/list",
  isAdmin,
  asyncHandler(async (req, res) => {
    const result = await Stuffs.find({ fieldName: "display" })
      .sort({ "data.created.date": -1 })
      .exec()

    res.json(result.map(({ _id, data }) => ({ _id, ...data })))
  }),
)

// получить продукты блока страницы
router.get(
  "/page/:pageId/block/:blockId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId, blockId } = req.params

    if (!pageId) throw new Error("A bad page id")

    const display = await Stuffs.findOne({ _id: pageId })

    if (!display) return res.status(404).send()

    const { ids } = display.data.blocks.find(block => block._id === blockId)
    const products = await Items.find(
      { _id: { $in: ids } },
      "category base doneStatus",
    )

    // т.к продукты выбираются по айди параллельно,
    // сортируем в том порядке, в котором они были добавлены
    products.sort(
      (p1, p2) =>
        ids.indexOf(p1._id.toString()) - ids.indexOf(p2._id.toString()),
    )
    res.json(products)
  }),
)

// создать страницу
router.post(
  "/page",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) throw new Error("A bad page name")

    const content = {
      fieldName: "display",
      data: {
        name,
        blocks: [],
      },
    }

    const { _id, data } = await new Stuffs(content).save()
    res.json({ _id, ...data })
  }),
)

// создать блок, переименовать названия блока или страницы
router.put(
  "/page/:pageId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId } = req.params
    if (!pageId) throw new Error("A bad page id")

    const { action } = req.body

    if (action === "rename") {
      const { match, $set } = req.body
      await Stuffs.updateOne(match, { $set })
      return res.end()
    }

    const { name } = req.body

    if (!name) throw new Error("A bad block name")

    const data = {
      _id: new ObjectID().toString(),
      name,
      ids: [],
      created: {
        author: req.user.username,
        authorId: req.user._id,
        date: new Date().toISOString(),
      },
    }

    await Stuffs.updateOne({ _id: pageId }, { $push: { "data.blocks": data } })
    res.json(data)
  }),
)

// добавить или удалить продукты в блоке
router.put(
  "/page/:pageId/block/:blockId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId, blockId } = req.params

    if (!pageId) throw new Error("A bad page id")

    if (!req.body) throw new Error("A block body is missing")

    const { pageName, data } = req.body
    const block = {
      ...data,
      updated: {
        author: req.user.username,
        authorId: req.user._id,
        date: new Date().toISOString(),
      },
    }

    await Stuffs.updateOne(
      { "_id": pageId, "data.blocks._id": blockId },
      { $set: { "data.blocks.$": block } },
    )

    // обновить кеш
    // примечание: вызывать только после того, как код выше обновил данные в БД
    if (pageName === "Главная") {
      await setMainPageCache()
    }

    res.json(block)
  }),
)

// изменить позицию блока
router.put(
  "/page/:pageId/blocks",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId } = req.params

    if (!pageId) throw new Error("A bad page id")

    if (!req.body) throw new Error("Blocks data is missing")

    if (!Array.isArray(req.body))
      throw new Error("Blocks data must be an Array")

    await Stuffs.updateOne(
      { _id: pageId },
      { $set: { "data.blocks": req.body } },
    )

    res.send()
  }),
)

// Удалить блок
router.delete(
  "/page/:pageId/block/:blockId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId, blockId } = req.params

    if (!pageId) throw new Error("A bad pageId id")

    await Stuffs.updateOne(
      { _id: pageId },
      { $pull: { "data.blocks": { _id: blockId } } },
    )

    res.send("The block has been removed")
  }),
)

// удалить страницу
router.delete(
  "/page/:pageId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { pageId } = req.params

    if (!pageId) throw new Error("A bad pageId id")

    await Stuffs.deleteOne({ _id: pageId })
    res.send("The page has been removed")
  }),
)

export default router
