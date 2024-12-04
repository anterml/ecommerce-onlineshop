import React, { Component } from "react"
import { Button } from "globalComponents/admin/buttons"
import request from "utils/request"
import createSections from "./createSections"
import createSearchKeywords from "./createSearchKeywords"
import DYNAMIC_SECTIONS from "../sections/data"
import { getResultProperties, kuhniFieldNames } from "utils/data/parts"

function setKuhnyaPrice(product) {
  const getSelectedFields = ({ settings: { selectedFieldIds }, groups }) => {
    return groups.map(
      ({ fields }) =>
        fields.find(field => selectedFieldIds.includes(field._id)) || fields[0],
    )
  }

  const { vars, dynamic } = product

  // поля по умолчанию
  const selectedFields = getSelectedFields(vars)

  // поля, только для самой кухни
  const mainFields = selectedFields.filter(f =>
    kuhniFieldNames.includes(f.name),
  )
  // и их общая стоимость
  const mainPrice = mainFields.reduce((sum, f) => sum + (f.price || 0), 0)

  // поля, только для модулей
  const partFields = selectedFields.filter(f => !mainFields.includes(f))
  // и их общая стоимость
  const partsPrice = dynamic.parts
    .filter(part => part.inset)
    .reduce((acc, part) => {
      const fieldsPrice = partFields.reduce((acc, selectedField) => {
        const properties = getResultProperties(part)

        if (!properties || !properties.includes(selectedField.name)) {
          return acc
        }

        const targetField = part.fields.find(f => f._id === selectedField._id)
        const fieldPrice = (targetField || selectedField).price || 0
        return acc + Number(fieldPrice)
      }, 0)

      return acc + Number(part.price + fieldsPrice) * (part.countInset || 1)
    }, 0)

  // итоговая стоимость кухни
  const totalPrice = mainPrice + partsPrice

  // мутируем объект,
  // т.к. this.product.base ссылается на this.props.product.base
  product.base = {
    ...product.base,
    price: totalPrice,
  }
}

export default class SaveElement extends Component {
  render() {
    const { product, status } = this.props

    if (status.value === "pending") this.product = null
    if (!this.product && status.value === "fulfilled") this.product = product

    const disabled = this.product === product

    return (
      <Button
        onClick={this.save}
        disabled={disabled}
      >
        Сохранить
      </Button>
    )
  }

  save = () => {
    const { product, actions } = this.props
    const data = {}

    if (product.general.category === "kuhnya") {
      setKuhnyaPrice(product)
    }

    for (let name in product) {
      if (name === "status") {
        continue
      } else if (name === "vars") {
        Object.keys(product.vars).forEach(v => {
          if (product.vars[v] !== this.product.vars[v])
            data["vars." + v] = product.vars[v]
        })
      } else if (name === "general") {
        const generalList = [
          "doneStatus",
          "description",
          "shortDescription",
          "sliderDescription",
          "collaboration",
          "dynamic",
          "sections",
        ]
        generalList.forEach(v => {
          if (product.general[v] !== this.product.general[v])
            data[v] = product.general[v]
        })
      } else {
        if (product[name] !== this.product[name]) data[name] = product[name]
      }
    }

    const { category } = this.product.general

    let sections
    if (createSections[category]) {
      sections = createSections[category](
        data.attrs || this.product.attrs,
        data.sattrs || this.product.sattrs,
      )

      const ds = data.sections || this.product.general.sections

      const dynamicSections = (DYNAMIC_SECTIONS[category] || []).filter(index =>
        ds.includes(index),
      )

      sections = sections.concat(dynamicSections)
      data.sections = sections
    }

    const params = {
      url: "admin/catalog/product/" + product.base.urlName,
      method: "put",
      data,
    }

    request(params).then(() => {
      const prevSections = this.props.product.general.sections
      if (
        sections &&
        (sections.length !== prevSections.length ||
          sections.find(s => !prevSections.includes(s)))
      ) {
        actions.general.change("sections", sections)
      }

      // изменить цену для кухонь, если менялись модули
      if (category === "kuhnya") {
        const isPriceChanged =
          this.product.base.price !== this.props.product.base.price
        if (isPriceChanged)
          actions.base.change("price", this.props.product.base.price)
      }

      // удалить
      if (this.props.product.general.doneStatus !== 3) {
        // только если до этого было на сервере
        if (this.product.general.doneStatus === 3) {
          request({
            url: `admin/keywords/${product.base.urlName}`,
            method: "del",
          })
        }
      }
      // обновить/добавить
      else {
        const keywordsData = createSearchKeywords(product)
        if (keywordsData) {
          request({
            url: "admin/keywords",
            method: "put",
            data: keywordsData,
          })
        }
      }

      this.product = this.props.product
      // Вызываем обновление render,
      // чтобы сделать кнопку disabled
      this.setState({})
    })
  }
}
