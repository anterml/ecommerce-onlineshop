import React, { Component } from "react"
import styled from "styled-components"
import {
  BaseInput,
  Title,
  Textarea,
  Select,
} from "globalComponents/admin/elements"
import CATEGORIES from "../../data-categories"

export default class Base extends Component {
  render() {
    const {
      name,
      price,
      description,
      imageFolder,
      inset,
      kind,
      article,
      clone,
      dimension,
      position,
      countInset,
    } = this.props.part
    const { change, normalize, changeSelect } = this

    return (
      <Block>
        <Item>
          <Title>Тип</Title>
          <Select
            name="kind"
            onChange={change}
            value={kind}
            disabled={clone}
          >
            {Object.keys(CATEGORIES).map((value, i) => (
              <option
                key={i}
                value={value}
              >
                {value}
              </option>
            ))}
          </Select>
        </Item>
        <Item>
          <Title>В комплекте</Title>
          <Select
            name="inset"
            onChange={changeSelect}
            value={!!inset}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Select>
        </Item>
        <Item>
          <Title>Расположение</Title>
          <Select
            name="position"
            onChange={changeSelect}
            value={position}
          >
            <option value="top">Верх</option>
            <option value="bottom">Низ</option>
          </Select>
        </Item>
        <Item>
          <Title>Кол-во в комплекте</Title>
          <BaseInput
            name="countInset"
            value={countInset || ""}
            onChange={change}
            onBlur={normalize}
            disabled={!inset}
          />
        </Item>
        <Item>
          <Title>Название</Title>
          <BaseInput
            name="name"
            value={name}
            onChange={change}
            onBlur={normalize}
            disabled={clone}
          />
        </Item>
        <Item>
          <Title>Цена</Title>
          <BaseInput
            name="price"
            value={price}
            onChange={change}
            onBlur={normalize}
          />
        </Item>
        <Item>
          <Title>Размеры</Title>
          <BaseInput
            name="dimension"
            value={dimension || ""}
            onChange={change}
            onBlur={normalize}
            disabled={clone}
          />
        </Item>
        <Item>
          <Title>Артикул</Title>
          <BaseInput
            name="article"
            value={article || ""}
            onChange={change}
            onBlur={normalize}
            disabled={clone}
          />
        </Item>
        <Item>
          <Title>Папка для картинок</Title>
          <BaseInput
            name="imageFolder"
            value={imageFolder}
            onChange={change}
            onBlur={normalize}
            disabled={clone}
          />
        </Item>
        <Item>
          <Title>Описание</Title>
          <Textarea
            name="description"
            value={description}
            onChange={change}
            onBlur={normalize}
            disabled={clone}
          />
        </Item>
      </Block>
    )
  }

  changeSelect = e => {
    let { name, value } = e.target
    if (name === "inset") {
      const inset = value === "true"
      if (!inset) {
        this.handleChange([
          [name, inset],
          ["countInset", 1],
        ])
      } else {
        this.handleChange(name, inset)
      }
    } else if (name === "position") {
      this.handleChange(name, value)
    }
  }

  normalize = e => {
    let { name, value } = e.target
    if (name) {
      if (name === "price") value = Number(value) || 0
      else if (name === "countInset") {
        value = !this.props.part.inset ? 1 : Number(value) || 1
        if (value < 1) value = 1
      } else value.trim()
      this.handleChange(name, value)
    }
  }

  change = e => {
    let { name, value } = e.target

    if (name === "dimension" && value) {
      var list = value.split(/([^\d]+)/g).filter(v => v)
      var head = list.slice(0, list.length - 1)
      var tail = list[list.length - 1]

      if (!parseInt(tail)) value = head.join("")

      value = value.replace(/(\d+)[^\d]+/g, "$1 x ")

      if (!parseInt(tail)) value += tail
    }

    if (name) this.handleChange(name, value)
  }

  handleChange(name, value) {
    const { part } = this.props
    const newPart = { ...part }
    if (Array.isArray(name)) {
      name.forEach(([n, v]) => {
        newPart[n] = v
      })
    } else {
      newPart[name] = value
    }

    this.props.actions.change(part, newPart)
  }
}

const Block = styled.div``

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  & > *:first-child {
    flex: 0 0 200px;
  }
`
