import React, { Component, Fragment } from "react"
import { Input, Title, Item } from "globalComponents/admin/elements"
import styled from "styled-components"
import { getRuCategoryName } from "utils/data/categories"

const ruNames = {
  kind: "Тип",
  name: "Название",
  urlName: "Адрес",
  imageFolder: "Папка для картинок",
  price: "Цена",
  oldPrice: "Старая цена",
  article: "Артикул",
  productCode: "Код продукта",
}

export default class Base extends Component {
  render() {
    const { base, category } = this.props
    return (
      <Fragment>
        <Item style={{ marginBottom: "30px" }}>
          <Title>Раздел</Title>
          <span>{getRuCategoryName(category)}</span>
        </Item>
        {Object.keys(ruNames).map(name => (
          <Item key={name}>
            <Title>{ruNames[name]}</Title>
            <Wrap>
              <Input
                value={base[name]}
                name={name}
                onChange={this.change}
                disabled={category === "kuhnya" && name === "price"}
              />
            </Wrap>
          </Item>
        ))}
      </Fragment>
    )
  }

  change = e => {
    let { name, value } = e.target

    if (name === "price" || name === "oldPrice") value = parseInt(value) || ""

    this.props.actions.change(name, value)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.base !== this.props.base
  }
}

const Wrap = styled.div`
  width: 300px;
  display: flex;
`
