import Stuffs from "server/models/stuffs"
import Items from "server/models/items"
import CACHE from "../store"

export default async () => {
  const display = await Stuffs.findOne({
    "fieldName": "display",
    "data.name": "main",
  })
  const ids = display.data.blocks.reduce(
    (acc, block) => acc.concat(block.ids.slice(0, 7)),
    [],
  )

  const products = await Items.find({ _id: ids }, "category base")

  const items = ids.reduce((acc, id) => {
    const targetProduct = products.find(
      product => product._id.toString() === id,
    )
    const targetBlock = display.data.blocks.find(block =>
      block.ids.includes(id),
    )

    if (!targetProduct || !targetBlock) return acc

    if (!acc[targetBlock.name]) acc[targetBlock.name] = [targetProduct]
    else acc[targetBlock.name].push(targetProduct)

    return acc
  }, {})

  const data = {
    blocks: display.data.blocks.map(({ name, ids }) => ({ name, ids })),
    items,
  }

  CACHE("display-main-page", data)
  return data
}
