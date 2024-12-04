import React from "react"
import styled from "styled-components"
import Product from "./product/product"

const Products = ({ actions, items }) => (
  <Block>
    <Row>
      <Header>Корзина</Header>
      <RemoveAllButton onClick={actions.removeAll}>Удалить все</RemoveAllButton>
    </Row>
    {items.map((product, i) => (
      <Product
        product={product}
        actions={actions}
        key={i}
      />
    ))}
  </Block>
)

export default Products

const Block = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 50%;
    margin-right: 30px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 767px) and (max-width: 1023px) {
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    border-bottom: 1px solid #ddd;
  }
`

const Header = styled.h2`
  font-size: 18px;
  margin: 0;
  padding: 15px 0;
`

const RemoveAllButton = styled.span`
  white-space: nowrap;
  color: #9e9e9e;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`
