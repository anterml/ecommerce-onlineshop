import React, { Component } from "react"
import styled from "styled-components"

import Product from "./product/product"
import Spinner from "../spinner"
import ScrollButtons from "./scrollButtons"

export default class Products extends Component {
  componentDidMount() {
    this.handleScroll()
  }

  handleScroll() {
    const elem = document.getElementById("product-list-ending")
    if (elem) {
      this.windowScroll = () => {
        // если нажата кнопка "показать еще"
        // pageSection сбрасывается в 0
        // поэтому в это время запрещаем подгружать позиции
        if (this.props.products.status === "pending") return

        const { top } = elem.getBoundingClientRect()
        const elemOnViewPort = top - window.innerHeight <= 0
        if (
          elemOnViewPort &&
          this.status !== "pending" &&
          this.props.products.canLoadMore
        ) {
          this.status = "pending"
          this.props.upload().then(() => {
            this.status = null
          })
        }
      }

      window.addEventListener("scroll", this.windowScroll)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.windowScroll)
  }

  render() {
    const { products, auth } = this.props
    const department = "mebel"

    return (
      <Block id="fabric-products">
        {products.status === "pending" && !products.page ? (
          <Spinner />
        ) : (
          <Content id="product-content">
            {products.values.map(product => (
              <Product
                {...{ product, department, auth }}
                key={product._id}
              />
            ))}
          </Content>
        )}
        <div id="product-list-ending" />
        {products.status === "pending" && products.page > 0 && <Spinner />}
        <ScrollButtons containerName="fabric-products" />
      </Block>
    )
  }
}

const Block = styled.div``

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`
