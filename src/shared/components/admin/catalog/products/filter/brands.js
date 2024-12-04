import React, { Component, Fragment } from "react"
import styled from "styled-components"
import DropDown, { Item } from "./dropdown"

export default class Brands extends Component {
  render() {
    const { brands, category, change, selectedBrand } = this.props

    const elems = brands.map(({ name, count }) => (
      <Brand
        {...{ name, count, change }}
        selected={name === selectedBrand}
        key={name}
      />
    ))

    const selectedValue = selectedBrand ? selectedBrand : "Показать всё"

    const total = brands.reduce((acc, brand) => acc + brand.count, 0)

    return (
      <DropDown
        title="Бренды"
        selectedValue={selectedValue}
        width="50%"
      >
        <Fragment>
          <Brand
            name="Показать всё"
            count={total}
            change={change}
            selected={!selectedBrand}
          />
          {elems}
          <Placeholder />
        </Fragment>
      </DropDown>
    )
  }
}

const Brand = ({ name, count, selected, change }) => (
  <Item
    onClick={change}
    data-brand={name}
    selected={selected}
  >
    <span>{name}</span>
    <Count>{count}</Count>
  </Item>
)

const Count = styled.span`
  color: #999;
  margin-left: 5px;
`

const Placeholder = styled.div`
  height: 100px;
`
