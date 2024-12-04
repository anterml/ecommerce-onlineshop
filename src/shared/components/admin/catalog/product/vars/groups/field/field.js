import React, { Component, Fragment } from "react"
import styled from "styled-components"

import MultiSelect from "globalComponents/admin/autocomplete/multiSelect"
import SingleSelect from "globalComponents/admin/autocomplete/singleSelect"
import MultiValues from "globalComponents/admin/multiValues"
import { Input } from "globalComponents/admin/elements"
const separator = ", "

class SFields extends Component {
  render() {
    const { sfields, field } = this.props
    const { remove, change, changeSingleSelect, changeMultiSelect, normalize } =
      this

    const elems = (sfields || []).map(
      ({ name, engName, values, multi, type, _id }, i) => {
        const value = field[engName] || ""

        if (multi) {
          return (
            <InputMultiSelect
              {...{ values, engName, name, value, remove }}
              change={changeMultiSelect}
              key={engName}
            />
          )
        } else if (Array.isArray(values)) {
          return (
            <InputSelect
              {...{ values, engName, name, value }}
              change={changeSingleSelect}
              id={field._id}
              key={engName}
            />
          )
        }

        return (
          <ItemWrap key={engName}>
            <Title>{name}</Title>
            <Wrap>
              <Input
                value={value}
                data-type={type}
                data-group-name={name}
                onChange={change}
                name={engName}
                onBlur={normalize}
              />
            </Wrap>
          </ItemWrap>
        )
      },
    )

    return <div>{elems}</div>
  }

  changeMultiSelect = (value, name) => {
    const { field, actions } = this.props

    if (field[name]) {
      const values = field[name].split(separator).filter(v => v)
      if (!values.includes(value)) {
        actions.changeField(field, name, values.concat(value).join(separator))
      }
    } else {
      actions.changeField(field, name, value)
    }
  }

  changeSingleSelect = (value, name) => {
    const { field, actions } = this.props
    actions.changeField(field, name, value)
  }

  normalize = e => {
    let { name, value, dataset } = e.target
    const { field, actions } = this.props
    const _value = value.trim()
    // добавить расширение для картинки/вида принта если не указано
    if (_value && name === "imageUrl" && !/\.(jpeg|jpg|png)$/i.test(_value)) {
      value = _value + ".jpg"
      actions.changeField(field, name, value)
    }

    if (_value && dataset.groupName === "Вид принта") {
      if (_value !== "-" && !/\.(jpeg|jpg|png)$/i.test(_value)) {
        value = _value + ".jpg"
        actions.changeField(field, name, value)
      }
    }

    // trim если нужно
    if (value && value !== _value) {
      actions.changeField(field, name, _value)
    }
  }

  change = e => {
    let { name, value, dataset } = e.target
    const { field, actions } = this.props

    if (dataset.type === "dimension" && value && value !== "*") {
      var list = value.split(/([^\d]+)/g).filter(v => v)
      var head = list.slice(0, list.length - 1)
      var tail = list[list.length - 1]

      if (!parseInt(tail)) value = head.join("")

      value = value.replace(/(\d+)[^\d]+/g, "$1 x ")

      if (!parseInt(tail)) value += tail
    } else if (name === "price") value = parseInt(value.trim()) || ""

    actions.changeField(field, name, value)
  }

  remove = e => {
    const { name, value } = e.currentTarget.dataset
    const { field, actions } = this.props
    const newValue = field[name]
      .split(separator)
      .filter(v => v !== value)
      .join(separator)

    if (value !== newValue) actions.changeField(field, name, newValue)
  }
}

export default class Field extends Component {
  componentDidMount() {
    const adminHeader = document.getElementById("admin-header-links-block")
    const block = document.getElementById("field-block")
    const container = document.getElementById("field-container")
    const catalogProduct = document.getElementById("js_catalog-product")
    let show = false

    this.scroll = () => {
      const { top, left, width } = block.getBoundingClientRect()
      const { bottom } = adminHeader.getBoundingClientRect()
      const extraGap = 15

      if (!show && top <= bottom + extraGap) {
        show = true
        container.style.cssText = `
          left: ${left}px;
          width: ${width}px;
          padding: 10px 15px 0 0;
          top: ${bottom}px;
          overflow-y: auto;
          position: fixed;
          bottom: 0;
        `
      }

      if (show && top > bottom + extraGap) {
        show = false
        container.style.cssText = ""
      }
    }

    if (adminHeader && block && container && catalogProduct)
      catalogProduct.addEventListener("scroll", this.scroll)
  }

  componentWillUnmount() {
    // удаляем скролл событие
    const catalogProduct = document.getElementById("js_catalog-product")
    if (catalogProduct)
      catalogProduct.removeEventListener("scroll", this.scroll)

    // устанавливаем стили по умолчанию
    const container = document.getElementById("field-container")
    if (container) container.style.cssText = ""
  }

  render() {
    const { field, categoryFields, actions, group } = this.props

    if (!field) {
      return (
        <Block id="field-block">
          <Container id="field-container">
            <Empty>Поля еще не созданы</Empty>
          </Container>
        </Block>
      )
    }

    const fieldName = group.kind || field.name
    const categoryField = categoryFields.find(c => c.name === fieldName)
    const { values, sfields, multi, type } = categoryField || {}
    const mainField = {
      name: field.name,
      engName: "value",
      multi,
      values,
      type,
    }
    const priceField = { name: "Цена", engName: "price" }
    const sf = [mainField, priceField, ...(sfields || [])]
    return (
      <Block id="field-block">
        <Container id="field-container">
          <SFields
            {...{ sfields: sf, field, change: this.props.changeField, actions }}
          />
        </Container>
      </Block>
    )
  }
}

const InputSelect = ({ values, name, engName, value, change, id }) => (
  <ItemWrap>
    <Title>{name}</Title>
    <SingleSelect
      values={values}
      value={value}
      placeholder={name}
      onChange={change}
      payload={engName}
      key={id}
    />
  </ItemWrap>
)

const InputMultiSelect = ({ values, name, engName, value, change, remove }) => (
  <ItemWrap>
    <Title>{name}</Title>
    <MultiWrap>
      <MultiSelect
        values={values}
        placeholder="Введите значение"
        payload={engName}
        onChange={change}
      />
    </MultiWrap>
    {value && (
      <MultiValues
        values={value.split(separator).map(value => ({ name: engName, value }))}
        remove={remove}
      />
    )}
  </ItemWrap>
)

const MultiWrap = styled.div`
  margin-bottom: 5px;
`

const Block = styled.div`
  width: 100%;
  min-height: 300px;
`

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`

const Empty = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  color: #999;
  margin-top: 20px;
`

const ItemWrap = styled.div`
  margin-bottom: 30px;
`

const Title = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  color: #111;
`

const Wrap = styled.div`
  display: flex;
`
