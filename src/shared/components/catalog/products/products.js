import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"

import List from "./list/list"
import Spinner from "./spinner"
import Paginator from "./paginator"
import LoadMoreButton from "./loadMoreButton"
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
        if (top - window.innerHeight <= 0 && this.status !== "pending") {
          if (this.props.products.pageSection < 2) {
            this.status = "pending"
            this.props.load().then(() => {
              this.status = null
            })
          }
        }
      }

      window.addEventListener("scroll", this.windowScroll)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.windowScroll)
  }

  render() {
    const { query } = this.props
    const { status, canLoadMore, value, count, initStatus, page, pageSection } =
      this.props.products

    if (status === "fulfilled" && !value.length) {
      return <Block id="productBlock">Нет товаров</Block>
    }

    return (
      <Block id="productBlock">
        <List {...this.props} />
        <div id="product-list-ending" />
        {initStatus && (
          <Overlay>
            <Spinner />
          </Overlay>
        )}

        {status === "fulfilled" && (
          <Paginator
            {...{ query, count, status, page }}
            click={this.handlePaginator}
          />
        )}

        {pageSection >= 2 && canLoadMore && status !== "pending" && (
          <LoadMoreButton load={this.loadMoreProducts} />
        )}

        {!initStatus && status === "pending" && <Spinner />}
        {status !== "fulfilled" && <EmptyFillerHeight />}
        <ScrollButtons containerName="productBlock" />
      </Block>
    )
  }

  handlePaginator = e => {
    const page = parseInt(e.target.dataset.page)
    if (page) {
      this.loadProducts(page, { dontCalcCategoryCount: true })
      window.scrollTo(0, 0)
    }
  }

  loadMoreProducts = () => {
    const productContent = document.getElementById("products-content")

    if (productContent) {
      const { bottom } = productContent.getBoundingClientRect()
      // smooth scrolling
      if (bottom > 60) {
        const easing = t =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

        const duration = 500
        const startingY = window.scrollY
        const diff = bottom - 15
        let start

        function step(timestamp) {
          if (!start) start = timestamp

          const time = timestamp - start
          const percent = easing(Math.min(time / duration, 1))

          window.scrollTo(0, startingY + diff * percent)

          if (time < duration) {
            window.requestAnimationFrame(step)
          }
        }

        window.requestAnimationFrame(step)
      } else {
        window.scrollTo(0, bottom + window.scrollY - 15)
      }
    }

    const p = parseInt(this.props.query.p) || 1
    this.loadProducts(
      p + 1,
      { dontCalcCategoryCount: true, needAppend: true },
      "replace",
    )
  }

  loadProducts(p, data, routerMethodName = "push") {
    const { location, history, query } = this.props

    const search = qs.stringify({ ...query, p })

    this.props.setProductOptions(data)

    history[routerMethodName]({
      pathname: location.pathname,
      search,
    })
  }
}

const Block = styled.div`
  min-height: 500px;
  margin-top: 40px;
  text-align: center;
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  //background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
  text-align: center;
`

const EmptyFillerHeight = styled.div`
  height: 500px;
`
