import express from "express"
import Items from "server/models/items"
import { asyncHandler } from "server/handlers"
import COLORS from "utils/data/colors"
import { getImageGroupName } from "utils/category-dependences"
import prettyPrice from "utils/prettyPrice"
import translite from "utils/translite"
import { BRANDS } from "utils/data/brands"

const router = express.Router()

function getBackgroundColors(value) {
  const backgroundColors = []

  value.split(/\s*\,\s*/).forEach(name => {
    const target = COLORS[name]
    if (target) backgroundColors.push(target.hex)
  })

  return backgroundColors
}

router.get(
  "/mebel",
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=3600")
    const match = { category: { $ne: "sp_phone" } }

    const isAdmin = req.user && req.user.admin
    if (!isAdmin) match.doneStatus = 3

    const aggregate = [
      { $match: match },

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
          _id: { brand: "$value", category: "$category" },
          value_sum: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: "$_id.brand",
          value: { $addToSet: { name: "$_id.category", count: "$value_sum" } },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]

    let result = await Items.aggregate(aggregate)

    if (!isAdmin)
      result = result.filter(brand => BRANDS.find(name => name === brand._id))

    result.forEach(brand => {
      brand.name = brand._id
      brand.engName = translite(brand._id.toLowerCase())
      if (!BRANDS.find(name => name === brand._id)) brand.notAdded = true
      delete brand._id
    })
    res.json(result)
  }),
)

router.get(
  "/mebel/products/:brand",
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=3600")
    const match = {}

    const brand = BRANDS.find(
      brand => translite(brand.toLowerCase()) === req.params.brand,
    )
    const categories = (req.query.categories || "").split(";").filter(Boolean)

    if (!brand) {
      return res.json({
        products: [],
      })
    } else {
      match.attrs = {
        $elemMatch: { name: "Бренд", value: brand },
      }
    }

    if (categories.length) match.category = { $in: categories }
    else match.category = { $ne: "sp_phone" }

    if (!req.user || !req.user.admin) match.doneStatus = 3

    const limit = 20
    const page = Number(req.query.page) || 0

    const items = await Items.find(match)
      .limit(limit + 1)
      .skip(page * limit)
      .exec()

    const VISIBLE_COLOR_COUNT = 5

    const products = items
      .slice(0, limit)
      .map(({ _id, category, base, vars, doneStatus }) => {
        const product = {
          _id,
          category,
          base,
          vars,
          doneStatus,
        }

        const colorGroupName = getImageGroupName(category)
        const colorGroup = vars.groups.find(
          group => group.name === colorGroupName,
        )

        const colors =
          colorGroup && colorGroup.fields
            ? colorGroup.fields.filter(color => typeof color.value === "string")
            : []

        const restColorCount = colors.length - VISIBLE_COLOR_COUNT
        if (restColorCount > 0) product.restColorCount = restColorCount

        product.colors = colors
          .slice(0, VISIBLE_COLOR_COUNT)
          .map(({ value }) => ({
            backgroundColors: getBackgroundColors(value),
            name: value,
          }))

        makePrettyPrice(product)

        return product
      })

    res.json({
      products,
      canLoadMore: items.length >= limit + 1,
    })
  }),
)

function makePrettyPrice(product) {
  const { price, oldPrice } = product.base

  product.prettyPrice = prettyPrice(price)

  if (oldPrice) product.prettyOldPrice = prettyPrice(oldPrice)

  if (!price) product.base.price = 0
}

export default router
