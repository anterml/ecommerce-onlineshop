import express from "express"
import Stuffs from "server/models/stuffs"
import { asyncHandler, isAdmin } from "server/handlers"
import setSeoTemplatesCache from "server/cache/set/seo-templates"

const router = express.Router()

router.get(
  "/:fieldName/list",
  isAdmin,
  asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 15
    const skip = parseInt(req.query.skip) || 0
    const { fieldName } = req.params

    const results = await Stuffs.find({ fieldName })
      .sort({ "created.date": -1 })
      .limit(limit + 1)
      .skip(skip)
      .lean()

    res.json(results.map(({ _id, data }) => ({ _id, ...data })))
  }),
)

router.put(
  "/:fieldName/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id, fieldName } = req.params

    if (!id || !fieldName || !req.body)
      throw new Error("A bad id or fieldName or no body")

    await Stuffs.updateOne(
      { _id: id },
      {
        $set: {
          ...req.body,
          "data.updated": {
            author: req.user.username,
            authorId: req.user._id,
            date: new Date().toISOString(),
          },
        },
      },
    )

    // update cache
    await setSeoTemplatesCache()
    res.send(`${fieldName} has been updated`)
  }),
)

router.post(
  "/:fieldName",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { fieldName } = req.params

    if (!fieldName || !req.body) throw new Error("Cannot create " + fieldName)

    const data = {
      fieldName,
      data: {
        ...req.body,
        text: "",
        created: {
          author: req.user.username,
          authorId: req.user._id,
          date: new Date().toISOString(),
        },
      },
    }

    const result = await new Stuffs(data).save()
    await setSeoTemplatesCache()
    res.json({ _id: result._id, ...result.data })
  }),
)

router.delete(
  "/:fieldName/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { id, fieldName } = req.params

    if (!id) throw new Error(`A bad ${fieldName} id`)

    await Stuffs.deleteOne({ _id: id })
    await setSeoTemplatesCache()
    res.send(`The ${fieldName} has been removed`)
  }),
)

export default router
