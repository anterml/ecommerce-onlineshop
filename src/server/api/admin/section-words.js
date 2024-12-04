import express from "express"
import Stuffs from "server/models/stuffs"
import { asyncHandler, isAdmin } from "server/handlers"
import { SECTIONS } from "utils/data/sections"
const router = express.Router()
const fieldName = "section-words"

router.get(
  "/",
  isAdmin,
  asyncHandler(async (req, res) => {
    const products = await Stuffs.findOne({ fieldName })
    const sections = products ? products.data : {}
    res.json(sections)
  }),
)

router.put(
  "/",
  isAdmin,
  asyncHandler(async (req, res) => {
    if (!req.body) throw new Error("no body")

    const { index, value } = req.body
    await Stuffs.updateOne(
      { fieldName },
      { $set: { [`data.${index}`]: value } },
    )
    return res.end()
  }),
)

router.get(
  "/fill",
  isAdmin,
  asyncHandler(async (req, res) => {
    const data = {
      fieldName,
      data: SECTIONS,
    }

    await new Stuffs(data).save()
    res.end()
  }),
)

export default router
