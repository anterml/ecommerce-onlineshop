import React, { Component, Fragment } from "react"
import Attrs from "./attrs"
import Colors from "./colors"
import { ATTRS, GENERAL_ATTRS } from "utils/data/attrs"
import { FILTER_COLORS } from "utils/data/colors"

const DIMENSION_LIST = ["Габариты", "Спальное место", "Габариты в раскладке"]

export default class Container extends Component {
  render() {
    const { category, product, productId, tab } = this.props
    const department = category === "sp_phone" ? "electronics" : "furniture"
    const allAttrs = GENERAL_ATTRS[department].concat(ATTRS[category])

    this.targetAttrs =
      tab === "attrs"
        ? allAttrs.filter(attr => attr.filter)
        : allAttrs.filter(attr => !attr.filter)

    const { add, remove, change, schange, targetAttrs } = this
    const attrs = product[tab]

    return (
      <Fragment>
        {tab === "attrs" && (
          <Colors
            values={attrs
              .filter(attr => attr.name === "Цвет")
              .map(attr => attr.value)}
            change={this.toggleColor}
            toggleAll={this.toggleAllColors}
          />
        )}
        <Attrs
          {...{ attrs, targetAttrs, add, remove, change, schange, productId }}
        />
      </Fragment>
    )
  }

  toggleAllColors = e => {
    const { actionName } = e.target.dataset
    const { toggleAll } = this.props.actions.attrs
    const name = "Цвет"

    const data = {
      actionName,
      name,
    }

    if (actionName === "select") {
      data.fields = Object.keys(FILTER_COLORS).map(value => ({
        name,
        value,
      }))

      toggleAll(data)
    } else if (actionName === "remove") toggleAll(data)
  }

  toggleColor = e => {
    const { value } = e.target.dataset
    const name = "Цвет"
    const target = this.props.product.attrs.find(
      attr => attr.name === name && attr.value === value,
    )

    if (target) this.props.actions.attrs.remove(target)
    else this.props.actions.attrs.add({ name, value })
  }

  // handle SingleSelect change
  change = (value, { target, name }) => {
    const actions = this.props.actions[this.props.tab]

    if (!value) actions.remove(target)
    else if (!target) actions.add({ name, value })
    else actions.change(target, { ...target, value })
  }

  // handle simple input change
  schange = e => {
    let { name, value } = e.currentTarget
    const { tab, product } = this.props

    const targetAttr = this.targetAttrs.find(attr => attr.name === name)
    if (!targetAttr) return

    if (targetAttr.type === "int" && value) value = parseInt(value) || ""

    const target = product[tab].find(attr => attr.name === name)

    this.change(value, { target, name })
  }

  // add value from MultiSelect
  add = (value, name) => {
    const { tab, product, actions } = this.props
    const targetAttr = this.targetAttrs.find(attr => attr.name === name)

    if (DIMENSION_LIST.includes(name)) {
      if (!targetAttr) return

      const values = value
        .split(/[^\d]+/)
        .map(m => parseInt(m))
        .filter(n => typeof n === "number" && !Number.isNaN(n))

      const signature = targetAttr.structure.split(/\s+/)
      if (values.length !== signature.length) return

      value = signature.reduce((acc, field, i) => {
        acc[field] = values[i]
        return acc
      }, {})
    } else if (targetAttr && targetAttr.type === "int") {
      value = Number(value.trim())
      if (Number.isNaN(value)) return
    }

    if (
      !product[tab].find(attr => attr.name === name && attr.value === value)
    ) {
      actions[tab].add({ name, value })
    }
  }

  remove = e => {
    let { name, value } = e.currentTarget.dataset
    const { tab, product, actions } = this.props
    const targetAttr = this.targetAttrs.find(attr => attr.name === name)
    let target

    if (DIMENSION_LIST.includes(name)) {
      if (!targetAttr || !targetAttr.structure) return

      const signature = targetAttr.structure.split(/\s+/)
      target = product[tab].find(attr => {
        if (!DIMENSION_LIST.includes(attr.name)) return false
        // превращаем объект типа { length, height, width }
        // в строку "length x height x width"
        const attrValue = signature.map(s => attr.value[s]).join(" x ")
        return attr.name === name && attrValue === value
      })
    } else {
      // Попытка преобразовать в число если это числовой аттрибут
      if (targetAttr && targetAttr.type === "int") {
        value = Number(value.trim())
        if (Number.isNaN(value)) return
      }

      target = product[tab].find(
        attr =>
          attr.name === name &&
          (attr.value === value || attr.value === String(value)),
      )
    }

    if (target) actions[tab].remove(target)
  }
}
