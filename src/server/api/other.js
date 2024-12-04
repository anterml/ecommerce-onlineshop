import mongoose from "mongoose"
import express from "express"
import Items from "server/models/items"
import Search from "server/models/search"
import { asyncHandler, isAdmin } from "server/handlers"
import config from "server/config/secret"
import initCache from "server/cache/init"

const router = express.Router()

mongoose.set("useFindAndModify", false)
mongoose.connect(config.dbPath, { useNewUrlParser: true }, (err, res) => {
  if (!err) initCache()
})

router.get(
  "/fulltext-search",
  asyncHandler(async (req, res) => {
    const keywords = (req.query.keywords || "").trim()
    if (!keywords) return res.json([])

    const match = {}

    if (req.query.context === "productCode") {
      const productCode = parseInt(keywords)
      if (typeof productCode !== "number" || Number.isNaN(productCode))
        return res.json([])

      match.productCode = { $regex: productCode + "" }
    } else {
      match.$and = keywords
        .split(";")
        .reduce(
          (acc, keyword) =>
            acc.concat({ keywords: { $regex: keyword, $options: "i" } }),
          [],
        )
    }

    const results = await Search.find(match).limit(10).exec()
    res.json(results)
  }),
)

router.put(
  "/admin/keywords",
  isAdmin,
  asyncHandler(async (req, res) => {
    if (!req.body) throw new Error("no body")

    const { urlName } = req.body
    await Search.updateOne({ urlName }, { $set: req.body }, { upsert: true })
    res.send("ok")
  }),
)

router.delete(
  "/admin/keywords/:urlName",
  isAdmin,
  asyncHandler(async (req, res) => {
    if (!req.body) throw new Error("no body")

    const { urlName } = req.params
    await Search.remove({ urlName })
    res.send("ok")
  }),
)

router.get(
  "/admin/search",
  asyncHandler(async (req, res) => {
    const { text, category, context } = req.query
    let returnFields = "base category"
    const match = {}

    if (category && category !== "all") {
      match.category = category
    }

    if (context === "article") {
      match.$or = [
        { "vars.configurations.article": { $regex: text, $options: "i" } },
        { "base.article": { $regex: text, $options: "i" } },
      ]

      returnFields += " vars.configurations.article"
    } else {
      match["base." + context] = { $regex: text, $options: "i" }
    }

    const products = await Items.find(match, returnFields)
      .limit(40)
      .sort({ "base.name": 1, "category": 1 })
      .exec()

    res.json(products)
  }),
)

export default router
