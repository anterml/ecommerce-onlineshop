import React, { Component } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import prettyPrice from "utils/prettyPrice"
import { getFullDate } from "utils/date"
import Spinner from "globalComponents/spinners/inline"
import Search from "globalComponents/admin/search/product"

import Header from "./header/header"
import Products from "./products/products"
import DND from "globalComponents/admin/dnd"
const DNDList = DND(Products)

const ROOT_IMAGE_URL = "https://storage.googleapis.com/yourpath"

const INITIAL_STATE = {
  status: null,
  changed: false,
  products: [],
}

export default class Department extends Component {
  state = INITIAL_STATE

  componentDidMount() {
    const { page, block } = this.props
    if (page && block) this.fetch(page._id, block._id)
  }

  componentDidUpdate(prevProps) {
    const { page, block } = this.props
    if (
      page &&
      block &&
      (!prevProps.block || block._id !== prevProps.block._id)
    ) {
      this.fetch(page._id, block._id)
    }
  }

  async fetch(pageId, blockId) {
    this.setState(() => ({ status: "pending" }))

    try {
      const products = await asyncRequest({
        url: `admin/display/page/${pageId}/block/${blockId}`,
      })

      this.setState(() => ({
        changed: false,
        status: "fulfilled",
        products: products.map(prepareProduct),
      }))
    } catch (e) {
      this.setState(() => ({
        status: e.status === 404 ? "404" : "rejected",
        products: [],
      }))
    }
  }

  render() {
    const { page, block } = this.props
    const { save, removeProduct, addProduct, isSelected } = this

    const { products, status, changed } = this.state
    const productCount = products.length

    if (status === "pending") {
      return (
        <SpinnerWrap>
          <Spinner borderWidth="6" />
        </SpinnerWrap>
      )
    }

    if (status === "404") return <Empty>Блок не найден</Empty>

    if (status === "rejected")
      return <Empty>Не получилось загрузить блок продуктов</Empty>

    if (!page) return <Empty>Выберите страницу</Empty>

    if (!block) return <Empty>Выберите блок</Empty>

    const title = `${page.name} / ${block.name}`
    return (
      <Block>
        <Search
          handle={addProduct}
          isSelected={isSelected}
          placeholder="Добавить продукт"
        />
        <Header
          {...{ productCount, save, changed, title }}
          block={prepareDate(block)}
        />
        <DNDList
          swap={this.swap}
          products={products}
          remove={removeProduct}
        />
      </Block>
    )
  }

  swap = (start, end) => {
    const { products } = this.state
    const startValue = products[Number(start)]
    const endValue =
      end === "last" ? products[products.length - 1] : products[Number(end)]

    if (!startValue || !endValue || startValue === endValue) return

    const buff = new Set()
    products.forEach(product => {
      if (product === startValue) return

      if (product === endValue && end !== "last") buff.add(startValue)

      buff.add(product)
    })

    // вставляем в самый конец если нужно
    if (end === "last") {
      buff.add(startValue)
    }

    this.setState(() => ({
      changed: true,
      products: [...buff],
    }))
  }

  addProduct = product => {
    if (!this.state.products.find(p => p._id === product._id)) {
      this.setState(state => ({
        changed: true,
        products: state.products.concat(prepareProduct(product)),
      }))
    }
  }

  isSelected = e => {
    return false
  }

  removeProduct = e => {
    const { id } = e.target.dataset

    if (id) {
      this.setState(state => ({
        changed: true,
        products: state.products.map(product =>
          product._id !== id
            ? product
            : { ...product, removed: !product.removed },
        ),
      }))
    }
  }

  save = () => {
    const products = this.state.products.filter(product => !product.removed)
    const { page, block } = this.props

    const params = {
      url: `admin/display/page/${page._id}/block/${block._id}`,
      method: "put",
      data: {
        data: {
          ...block,
          ids: products.map(product => product._id),
        },
        // имя для серверного кеша
        pageName: page.name,
      },
    }

    asyncRequest(params).then(newBlock => {
      this.setState(state => ({
        changed: false,
        products: state.products.filter(product => !product.removed),
      }))
      this.props.refreshBlock(block, newBlock)
    })
  }
}

function prepareDate(block) {
  const newBlock = { ...block }
  const { created, updated } = block

  if (created) {
    newBlock.created = {
      ...created,
      date: getFullDate(created.date),
    }
  }

  if (updated) {
    newBlock.updated = {
      ...updated,
      date: getFullDate(updated.date),
    }
  }

  return newBlock
}

function prepareProduct({ _id, category, base }) {
  const { imageFolder, urlName, price, name, kind, productCode } = base
  return {
    _id,
    fullName: kind + " " + name,
    prettyPrice: prettyPrice(price),
    productCode: productCode,
    url: `/mebel/${category}/${urlName}`,
    image: {
      backgroundImage: `url("${ROOT_IMAGE_URL}/${category}/${imageFolder}/ct/1.jpg")`,
    },
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  max-height: 100%;
  border-right: 1px solid #555;
`

const SpinnerWrap = styled.div`
  margin: 100px auto 0;
  text-align: center;
  width: 50px;
  height: 50px;
`

const Empty = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 100px;
  font-weight: 300;
  color: #b5b5b5;
  flex: 1 1 auto;
`
