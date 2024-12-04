import React, { Component } from "react"
import styled from "styled-components"
import Product from "./product/product"

export default class List extends Component {
  render() {
    const { department, auth } = this.props
    const products = this.props.products.value

    const productElems = products.map(product => (
      <Product
        {...{ product, department, auth }}
        key={product._id}
      />
    ))

    return <Block id="products-content">{productElems}</Block>
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.products.value !== this.props.products.value
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;

  @media (max-width: 500px) {
    justify-content: space-around;
  }
`
