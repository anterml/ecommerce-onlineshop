import Stuffs from "server/models/stuffs"
import CACHE from "../store"

export default async () => {
  const results = await Stuffs.find({ fieldName: "seo-template" }).lean()
  const data = results.map(({ _id, data: { text, name } }) => ({
    _id,
    text,
    name,
  }))

  CACHE("seo-templates", data)
  return data
}
