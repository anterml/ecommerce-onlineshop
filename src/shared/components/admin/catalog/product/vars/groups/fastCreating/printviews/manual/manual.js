import React, { Component, Fragment } from "react"
import styled from "styled-components"

import { Input } from "globalComponents/admin/elements"
import SingleSelect from "globalComponents/admin/autocomplete/singleSelect"
import { FABRICS } from "../../../printviewFabricTemplate"

export default class Manual extends Component {
  state = {
    count: "",
    imageFolder: "",
    category: "",
    material: "",
    price: "",
    fabricName: "",
    backgroundSize: "",
    imageExt: "jpg",
  }

  render() {
    const {
      count,
      fabricName,
      category,
      imageFolder,
      backgroundSize,
      imageExt,
      price,
      material,
    } = this.state
    const { change, autocompleteChange } = this

    return (
      <Block>
        <Todo>Еще не доделано</Todo>
        <Item>
          <Title>Кол-во</Title>
          <Input
            name="count"
            value={count}
            onChange={change}
          />
        </Item>

        <Item>
          <Title>Фабрика</Title>
          <SingleSelect
            values={FABRICS.map(f => f.name)}
            value={fabricName}
            onChange={autocompleteChange}
            payload={"fabricName"}
          />
        </Item>

        <Item>
          <Title>Категория</Title>
          <Input
            name="category"
            value={category}
            onChange={change}
          />
        </Item>

        <Item>
          <Title>Подпапка</Title>
          <Input
            name="imageFolder"
            value={imageFolder}
            onChange={change}
          />
        </Item>

        <Item>
          <Title>Материал</Title>
          <Input
            name="material"
            value={material}
            onChange={change}
          />
        </Item>

        <Item>
          <Title>Цена</Title>
          <Input
            name="price"
            value={price}
            onChange={change}
          />
        </Item>

        <Item>
          <Title>Расширение</Title>
          <select
            name="imageExt"
            value={imageExt}
            onChange={change}
          >
            <option value="jpg">jpg</option>
            <option value="jpeg">jpeg</option>
            <option value="png">png</option>
          </select>
        </Item>

        <Item>
          <Title>Отображение</Title>
          <select
            name="backgroundSize"
            value={backgroundSize}
            onChange={change}
          >
            <option value="auto">auto</option>
            <option value="cover">cover</option>
            <option value="contain">contain</option>
          </select>
        </Item>
      </Block>
    )
  }

  fillImages = c => {
    const buff = []

    if (!c.count) return buff

    for (let i = 1; i <= c.count; ++i) {
      if (c.skip && c.skip.includes(i)) continue
      buff.push(i + ".jpg")
    }

    return buff
  }

  autocompleteChange = fabricName => {
    this.setState({ fabricName })
  }

  change = e => {
    let { name, value } = e.target

    if (name === "price" || name === "count") value = parseInt(value) || ""

    this.setState({ [name]: value })
  }
}

const Block = styled.div`
  & input,
  & select {
    width: 100%;
  }
`

const Title = styled.div`
  font-weight: 500;
  margin: 0 5px 5px 0;
  flex: 0 0 90px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Todo = styled.div`
  color: #ff4900;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`
