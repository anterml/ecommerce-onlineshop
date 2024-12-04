import express from "express"
import Items from "server/models/items"
import Stuffs from "server/models/stuffs"
import CACHE from "server/cache/store"
import { asyncHandler, isAdmin } from "server/handlers"
const router = express.Router()

router.get(
  "/products/list/:category",
  asyncHandler(async (req, res) => {
    const { category } = req.params
    const { limit, skip, brand } = req.query
    const doneStatus = parseInt(req.query.doneStatus)

    if (!category) throw new Error(`Category ${category} is not found`)

    const matchQuery = {}

    if (category !== "all") matchQuery.category = category

    if (typeof doneStatus === "number" && !Number.isNaN(doneStatus))
      matchQuery.doneStatus = doneStatus

    if (brand) {
      matchQuery.attrs = {
        $elemMatch: {
          name: "Бренд",
          value: brand,
        },
      }
    }

    const [count, products] = await Promise.all([
      Items.countDocuments(matchQuery),
      Items.find(matchQuery)
        .select("base creating updating doneStatus")
        .sort({ "creating.date": -1, "name": 1 })
        .limit(parseInt(limit) || 50)
        .skip(parseInt(skip) || 0)
        .exec(),
    ])

    return res.json({ count, products })
  }),
)

router.get(
  "/products/filter/doneStatus",
  asyncHandler(async (req, res) => {
    const aggregate = [
      {
        $group: {
          _id: {
            category: "$category",
            doneStatus: "$doneStatus",
          },
          count: { $sum: 1 },
        },
      },
    ]

    const result = await Items.aggregate(aggregate)
    res.json(result)
  }),
)

router.get(
  "/products/filter/brands",
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=300")
    const aggregate = [
      { $unwind: "$attrs" },
      {
        $project: {
          name: "$attrs.name",
          value: "$attrs.value",
          category: "$category",
        },
      },
      {
        $redact: {
          $cond: [{ $eq: ["Бренд", "$name"] }, "$$DESCEND", "$$PRUNE"],
        },
      },

      {
        $group: {
          _id: { name: "$category", value: "$value" },
          value_sum: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: "$_id.name",
          value: { $addToSet: { name: "$_id.value", count: "$value_sum" } },
        },
      },
    ]

    const result = await Items.aggregate(aggregate)
    res.json(result)
  }),
)

router.get(
  "/product-internal-data",
  asyncHandler(async (req, res) => {
    const internalData = {
      seoTemplates: CACHE("seo-templates") || [],
    }

    res.json(internalData)
  }),
)

router.get(
  "/product/:urlName",
  asyncHandler(async (req, res) => {
    const product = await Items.findOne({
      "base.urlName": req.params.urlName,
    })

    if (!product) return res.status(404).end()
    res.json(product)
  }),
)

router.post(
  "/product",
  isAdmin,
  asyncHandler(async (req, res) => {
    if (!req.body) throw new Error("No product data")

    const data = {
      ...req.body,
      creating: {
        userName: req.user.username,
        userId: req.user._id,
      },
    }

    const product = await new Items(data).save()
    res.json(product)
  }),
)

router.put(
  "/product/:urlName",
  isAdmin,
  asyncHandler(async (req, res) => {
    const $set = req.body

    if (!$set) return res.send("Nothing to change")

    $set.updating = {
      userName: req.user.username,
      userId: req.user._id,
      date: Date.now(),
    }

    await Items.updateOne(
      { "base.urlName": req.params.urlName },
      { $set },
    ).exec()

    res.send("The Product has been changed")
  }),
)

router.get(
  "/get-unique-productCode",
  isAdmin,
  asyncHandler(async (req, res) => {
    const result = await Stuffs.findOneAndUpdate(
      { fieldName: "productCounter" },
      { $inc: { data: 1 } },
      { new: true },
    )

    const counter = parseInt((result || {}).data) || 0
    res.json({ counter })
  }),
)

router.get(
  "/kuhni-templates",
  isAdmin,
  asyncHandler(async (req, res) => {
    const results = await Items.find(
      { "category": "kuhnya", "dynamic.isTemplate": true },
      "base.name",
    )

    const products = results.map(({ _id, base }) => ({
      _id,
      name: base.name,
    }))

    res.json(products)
  }),
)

router.get(
  "/kuhni-templates/parts/:productId",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { productId } = req.params
    const result = await Items.findOne({ _id: productId }, "base dynamic.parts")

    res.json({
      productId,
      urlName: result.base.urlName,
      imageFolder: result.base.imageFolder,
      values: result.dynamic.parts,
    })
  }),
)

export default router
