import React from "react"
import styled from "styled-components"
import qs from "query-string"

import Categories from "./categories/categories"
import Products from "./products/products"
import Product from "./product/product"
import Search from "./search/search"

const Catalog = props => {
  const p = {
    ...props,
    query: qs.parse(props.location.search),
  }

  return (
    <Block>
      <LayoutCategory>
        <Wrap />
        <Categories {...p} />
      </LayoutCategory>
      <Products {...p} />
      <LayoutProduct id="js_catalog-product">
        <Search {...p} />
        <Product {...p} />
      </LayoutProduct>
    </Block>
  )
}

export default Catalog

const Block = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

const Wrap = styled.div`
  flex: 0 0 30px;
  height: 100%;
  background-color: #ddd;
`

const LayoutCategory = styled.div`
  flex: 0 0 30px;
  display: flex;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #ddd;
  color: #fff;
  padding: 10px 0;
  border-right: 1px solid #ccc;
  border-left: 1px solid transparent;
  position: relative;

  &:hover {
    background-color: #fff;
    flex: 0 0 270px;
    overflow-y: scroll;
    border-color: transparent;
    border-left: 1px solid #ccc;
  }

  &:hover ${Wrap} {
    background-color: #fff;
  }
`

const LayoutProduct = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
`
