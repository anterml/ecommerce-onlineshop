import express from "express"
import Items from "server/models/items"
import { asyncHandler, isAdmin } from "server/handlers"

const router = express.Router()

const fieldName = "vars.settings.instockPlaces"
const selectedFields = `category base ${fieldName}`

const prepareProduct = product => {
  product.department = product.category === "sp_phone" ? "electronics" : "mebel"
  const { instockPlaces } = product.vars.settings
  product.instockPlaces = Array.isArray(instockPlaces) ? instockPlaces : []
  delete product.vars
}

router.get(
  "/list",
  isAdmin,
  asyncHandler(async (req, res) => {
    const products = await Items.find({
      [fieldName]: { $exists: true, $ne: [] },
    })
      .sort({ "base.productCode": -1 })
      .select(selectedFields)
      .lean()

    products.forEach(prepareProduct)
    res.json(products)
  }),
)

router.get(
  "/productCode/:productCode",
  isAdmin,
  asyncHandler(async (req, res) => {
    const { productCode } = req.params

    const product = await Items.findOne({ "base.productCode": productCode })
      .select(selectedFields)
      .lean()

    if (!product) return res.status(404).end()

    prepareProduct(product)
    res.json(product)
  }),
)

router.put(
  "/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const instockPlaces = req.body
    const { id } = req.params
    await Items.updateOne({ _id: id }, { $set: { [fieldName]: instockPlaces } })
    res.send("Instock places have been changed")
  }),
)

export default router
