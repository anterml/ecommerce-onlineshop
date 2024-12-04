import express from "express"
import Items from "server/models/items"
import { asyncHandler } from "server/handlers"

import normalizeDescription from "utils/normalize-description"
import CATEGORIES_IDS from "./categoryIds"
import CATEGORIES from "utils/data/categories"

const router = express.Router()

router.get(
  "/single/:urlName",
  asyncHandler(async (req, res) => {
    const { urlName } = req.params
    const rootImageUrl = "https://storage.googleapis.com/yourpath"

    if (!urlName) throw new Error("Продукт не найден!")

    const product = await Items.findOne({ "base.urlName": urlName })
    const { vars, images, attrs, base, category } = product
    const { price, name, kind, imageFolder, productCode } = base

    const skipFields = ["Вид принта"]
    let many
    const varFields = vars.groups
      .filter(group => !skipFields.includes(group.name))
      .map(group => {
        const values = []
        group.fields.forEach(field => {
          if (!values.includes(field.value)) {
            values.push(field.value)
          }
        })
        if (values.length > 1) many = true
        return `<div><strong>${group.name}</strong></div><ul>${values
          .map(v => "<li>" + v + "</li>")
          .join("")}</ul>`
      })
      .join("")

    const header = many ? "<h3>Доступные разновидности</h3><br>" : ""
    const description = `<![CDATA[
    ${header}
    ${varFields}
    <br>
    ${normalizeDescription(product.description)}
  ]]>`

    const country = attrs
      .filter(attr => attr.name === "Страна производитель")
      .map(attr => attr.value)
      .join(", ")

    const brand = attrs
      .filter(attr => attr.name === "Бренд")
      .map(attr => attr.value)
      .join(", ")

    const pictures = images
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(
        image =>
          `<picture>${rootImageUrl}/${category}/${imageFolder}/${image}</picture>`,
      )
      .join("\n")

    const date = new Date().toISOString().replace("T", " ").substr(0, 16)
    const fullName = (kind + " " + name).trim()
    const categoryId = CATEGORIES_IDS[category]
    const categoryRu = CATEGORIES[category]

    const { instock } = vars.settings
    const available = !(instock === 0 || instock === -1)

    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE yml_catalog SYSTEM "shops.dtd">
    <yml_catalog date="${date}">
      <shop>
        <name>yoursite интернет-магазин</name>
        <company>yoursite интернет-магазин</company>
        <url>https://www.yoursite.ru</url>
        <currencies>
          <currency id="RUR" rate="1"/>
        </currencies>
        <categories>
          <category id="1">Мебель</category>
          <category id="${categoryId}" parentId="1">${categoryRu}</category>
        </categories>
        <offers>
          <offer available="${available}" id="${productCode}">
            <name>${fullName}</name>
            <price>${price}</price>
            ${pictures}
            <currencyId>RUR</currencyId>
            <categoryId>${categoryId}</categoryId>
            <delivery>true</delivery>
            <vendorCode>${productCode}</vendorCode>
            <description>${description}</description>
            <country>${country}</country>
            <param name="Бренд">${brand}</param>
          </offer>
        </offers>
      </shop>
    </yml_catalog>
  `

    res.send(xml.trim())
  }),
)

export default router
