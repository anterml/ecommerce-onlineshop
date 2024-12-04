import React from "react"
import styled from "styled-components"
import Product from "./product"

const List = ({ products, selectProduct, urlName }) => (
  <Block>
    {products.map(product => (
      <Product
        {...product}
        selectProduct={selectProduct}
        selected={product.urlName === urlName}
        key={product._id}
      />
    ))}
  </Block>
)

export default List

const Block = styled.div``
