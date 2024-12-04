import express from "express"
import Items from "server/models/items"
import Sets from "server/models/sets"
import { asyncHandler } from "server/handlers"
import { setColors } from "./utils"
import setBreadcrumbs from "./setBreadcrumbs"
import Cache from "server/cache/store"
import normalizeDescription from "utils/normalize-description"
const router = express.Router()

router.get(
  "/:urlName",
  asyncHandler(async (req, res) => {
    const product = await Items.findOne(
      { "base.urlName": req.params.urlName },
      "-creating -updating",
    ).lean()

    if (!product) return res.status(404).send()

    // если статус продукта не "На сервере" и запрашивает не админ
    if (product.doneStatus !== 3 && !(req.user && req.user.admin))
      return res.status(404).send()

    setColors(product)
    setBreadcrumbs(product)

    const { descriptionTemplateId, descriptionText } = product.seo || {}

    if (descriptionTemplateId) {
      const template = Cache("seo-templates").find(
        t => t._id.toString() === descriptionTemplateId,
      )

      if (template) product.seoDescription = template.text
    } else if (descriptionText) {
      product.seoDescription = descriptionText
    }

    if (product.seoDescription)
      product.seoDescription = normalizeDescription(product.seoDescription)
    product.description = normalizeDescription(product.description)

    if (!req.query.isServerSide) {
      delete product.seo
    }

    res.json(product)
  }),
)

router.get(
  "/product-slider/:category",
  asyncHandler(async (req, res) => {
    const { category } = req.params

    if (!category) throw new Error(`Category ${category} is not found`)

    const match = { category }

    const skip = parseInt(req.query.skip) || 0
    let limit = parseInt(req.query.limit) || 9
    // если это первый запрос, то загрузить в 2 раза больше продуктов
    if (!skip) limit *= 2

    const revisionUserIds = []

    // проверка статуса
    if (
      !req.user ||
      !req.user.admin ||
      revisionUserIds.indexOf(req.user._id.toString()) !== -1
    )
      match.doneStatus = 3

    const products = await Items.find(match)
      .sort({ "creating.date": -1 })
      .limit(limit)
      .skip(parseInt(skip) || 0)
      .select("base revisionStatus")
      .exec()

    res.json(products)
  }),
)

router.get(
  "/product-slider2/:category",
  asyncHandler(async (req, res) => {
    const { category } = req.params

    if (!category) throw new Error(`Category ${category} is not found`)

    const LINE_COUNT = 9
    let { productCode, skip, limit } = req.query
    limit = parseInt(limit) || LINE_COUNT

    const match = { category }

    if (!req.user || !req.user.admin) match.doneStatus = 3

    const results = {}

    if (productCode) {
      const requests = [
        Items.countDocuments(match),
        Items.countDocuments({
          ...match,
          "base.productCode": { $gt: productCode },
        }),
      ]

      const [count, itemIndex] = await Promise.all(requests)
      results.count = count
      results.itemIndex = itemIndex

      skip = Math.floor(itemIndex / LINE_COUNT) * LINE_COUNT
    } else {
      skip = parseInt(skip) || 0
    }

    results.items = await Items.find(match)
      .skip(skip)
      .limit(limit)
      .select("base revisionStatus doneStatus")
      .sort({ "creating.date": -1 })

    return res.json(results)
  }),
)

router.get(
  "/cross-sell/:category",
  asyncHandler(async (req, res) => {
    // 10 hours cache
    if (!req.user || !req.user.admin) res.set("Cache-control", "max-age=18000")

    const { category } = req.params
    if (!category) throw new Error(`Category ${category} is not found`)

    const products = await Items.find({ category, doneStatus: 3 })
      .select("base")
      .limit(parseInt(req.query.limit) || 10)
      .exec()

    res.json(products)
  }),
)

router.get(
  "/sets/:productUrlName",
  asyncHandler(async (req, res) => {
    const { productUrlName } = req.params

    const product = await Items.findOne(
      { "base.urlName": productUrlName },
      "_id",
    )
    if (!product) return res.status(400).end("product not found")

    let sets = await Sets.find(
      { productIds: product._id.toString() },
      "name productIds kind",
    ).lean()

    if (!Array.isArray(sets)) return res.json([])

    sets = sets.filter(set => set.productIds.length)
    const set =
      sets.find(set => set.kind === 0) || sets.find(set => set.kind === 1)
    if (!set) return res.json([])

    const { productIds } = set
    const match = { _id: { $in: productIds } }

    if (!req.user || !req.user.admin) match.doneStatus = 3

    set.products = await Items.find(match, "category base doneStatus").limit(7)
    res.json(sets)
  }),
)

router.get(
  "/products/:productIds",
  asyncHandler(async (req, res) => {
    const productIds = (req.params.productIds || "").split(",")

    if (!productIds.length) return res.json([])

    const match = { _id: { $in: productIds } }
    if (!req.user || !req.user.admin) match.doneStatus = 3

    const products = await Items.find(match, "category base doneStatus")
    res.json(products)
  }),
)

export default router
