import React, { Component } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import prettyPrice from "utils/prettyPrice"

import Attrs from "./attrs"
import Count from "./count"

const rootImageUrl = "shop/category"

export default class Product extends Component {
  render() {
    const { name, count, totalPrice, kind, varFields, category, dynamic } =
      this.props.product

    return (
      <Block count={count}>
        <Image>
          <img src={this.getImageUrl()} />
        </Image>
        <Details>
          <NameLink to={this.getProductUrl()}>
            {kind} {name}
          </NameLink>
          {category === "kuhnya" ? (
            <div>Модулей: {dynamic.parts.length}</div>
          ) : (
            <Attrs fields={varFields} />
          )}
          <RemoveButton onClick={this.remove}>Удалить</RemoveButton>
        </Details>
        <Wrap>
          <Count
            value={count}
            inc={this.incCount}
            dec={this.decCount}
          />
          {count > 1 && <Price>1шт = {prettyPrice(totalPrice)} р</Price>}
        </Wrap>
        <FullPrice>{prettyPrice(totalPrice * count)} р</FullPrice>
        <BottomRemoveButton onClick={this.remove}>Удалить</BottomRemoveButton>
      </Block>
    )
  }

  getProductUrl = () => {
    const { urlName, category, configurationCode } = this.props.product
    const department = category === "sp_phone" ? "electronics" : "mebel"

    let url = `/${department}/${category}/${urlName}`

    if (configurationCode) url += "?pc=" + configurationCode

    return url
  }

  getImageUrl = () => {
    const { category, imageFolder, image } = this.props.product
    const department = category === "sp_phone" ? "electronics" : "furniture"

    return `${rootImageUrl}/${department}/${category}/${imageFolder}/ct/${
      image || "1.jpg"
    }`
  }

  incCount = e => {
    const { actions, product } = this.props
    actions.changeCount(product, product.count + 1)
  }

  decCount = e => {
    const { actions, product } = this.props
    if (product.count > 0) actions.changeCount(product, product.count - 1)
  }

  remove = () => {
    this.props.actions.remove(this.props.product)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.product !== this.props.product
  }
}

const Block = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  opacity: ${props => (props.count > 0 ? 1 : 0.4)};

  @media (max-width: 499px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px dashed #ddd;
    text-align: center;
  }
`

const NameLink = styled(Link)`
  color: #0670eb;
  font-size: 15px;
`

const RButton = styled.div`
  font-size: 11px;
  color: #999;
  cursor: pointer;
  text-decoration: underline;
  text-transform: lowercase;
`

const RemoveButton = styled(RButton)`
  @media (max-width: 499px) {
    display: none;
  }
`

const BottomRemoveButton = styled(RButton)`
  @media (max-width: 499px) {
    color: red;
  }

  @media (min-width: 500px) {
    display: none;
  }
`

const Details = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  max-width: 300px;
  margin: 0 0 15px;

  @media (min-width: 500px) {
    width: 100%;
    margin: 0 20px;
  }
`

const Image = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 100px;

  @media (max-width: 499px) {
    margin-bottom: 10px;
    justify-content: center;
  }

  & img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`

const Wrap = styled.div`
  user-select: none;
  text-align: center;
`

const Price = styled.span`
  color: #828282;
  font-size: 12px;
  font-weight: 300;
`

const FullPrice = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 15px;
  text-align: right;
  flex: 0 0 35px;
  @media (min-width: 500px) {
    flex: 0 0 75px;
  }
`
