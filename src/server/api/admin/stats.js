import express from "express"
import Items from "server/models/items"
import { asyncHandler, isAdmin } from "server/handlers"

const router = express.Router()

const $and = [{ doneStatus: { $ne: 6 } }, { doneStatus: { $ne: 7 } }]

router.get(
  "/employees/users",
  isAdmin,
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=300")
    const aggregate = [
      {
        $match: {
          "creating.date": { $gte: new Date("2017-11-09") },
          $and,
        },
      },
      {
        $group: {
          _id: {
            userId: "$creating.userId",
            userName: "$creating.userName",
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
  "/employees/graph/:userName",
  isAdmin,
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=300")

    const aggregate = [
      {
        $match: {
          "creating.date": { $gte: new Date("2017-11-09") },
          "creating.userName": req.params.userName,
          $and,
        },
      },
      {
        $project: {
          yearMonthDay: {
            $dateToString: { format: "%Y-%m-%d", date: "$creating.date" },
          },
          author: "$creating.userName",
        },
      },
      {
        $group: {
          _id: "$yearMonthDay",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]

    const result = await Items.aggregate(aggregate)
    res.json(result)
  }),
)

router.get(
  "/employees/products/:userName/:date",
  isAdmin,
  asyncHandler(async (req, res) => {
    res.set("Cache-control", "max-age=300")
    const { date, userName } = req.params

    const today = new Date(date)
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    const result = await Items.find(
      {
        "creating.userName": userName,
        "creating.date": { $gte: today, $lt: tomorrow },
        $and,
      },
      "doneStatus base shortDescription creating category",
    )
      .sort({ "creating.date": 1 })
      .exec()

    res.json(result)
  }),
)

export default router
