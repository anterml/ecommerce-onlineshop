import express from "express"
import Items from "server/models/items"
import { asyncHandler } from "server/handlers"
import CACHE from "server/cache/store"
import setMainPageCache from "server/cache/set/main-page"

const router = express.Router()

router.get(
  "/products/",
  asyncHandler(async (req, res) => {
    const cacheName = "display-main-page"

    if (CACHE(cacheName)) {
      return res.json(CACHE(cacheName))
    }

    const data = await setMainPageCache()
    res.json(data)
  }),
)

router.get(
  "/products/items",
  asyncHandler(async (req, res) => {
    const ids = (req.query.ids || "").split("-").filter(id => id.length === 24)

    if (!ids.length) res.json([])

    const products = await Items.find({ _id: ids }, "category base")

    res.json(products)
  }),
)

export default router
