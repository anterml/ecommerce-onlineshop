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

const ROOT_IMAGE_URL = "shop/category/furniture"

const INITIAL_STATE = {
  status: null,
  set: null,
  changed: false,
  products: [],
}

export default class SetItem extends Component {
  state = INITIAL_STATE

  componentDidMount() {
    if (this.props.id) this.fetch(this.props.id)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    if (id && id !== prevProps.id) this.fetch(id)
  }

  async fetch(id) {
    this.setState(state => ({ status: "pending" }))

    try {
      const { set, products } = await asyncRequest({
        url: `admin/sets/set/${id}`,
      })

      this.setState(state => ({
        changed: false,
        status: "fulfilled",
        set: prepareSet(set),
        products: sortProducts(products, set).map(prepareProduct),
      }))
    } catch (e) {
      this.setState(state => ({
        status: e.status === 404 ? "404" : "rejected",
        set: null,
        products: [],
      }))
    }
  }

  render() {
    const { set, products, status, changed } = this.state
    const { remove, save, removeProduct, addProduct, changeKind, isSelected } =
      this
    const productCount = products.length

    if (status === "pending") {
      return (
        <SpinnerWrap>
          <Spinner borderWidth="6" />
        </SpinnerWrap>
      )
    }

    if (status === "404") return <Empty>Коллекция не найдена</Empty>

    if (status === "rejected")
      return <Empty>Не получилось загрузить коллекцию</Empty>

    if (status !== "fulfilled") return <Empty>Коллекция не выбрана</Empty>

    return (
      <Block>
        <Header {...{ set, productCount, save, remove, changed, changeKind }} />
        <DNDList
          swap={this.swap}
          products={products}
          remove={removeProduct}
        />
        <Search
          handle={addProduct}
          isSelected={isSelected}
          placeholder="Добавить продукт"
        />
      </Block>
    )
  }

  changeKind = e => {
    const kind = Number(e.target.value)
    this.setState(state => ({
      set: { ...state.set, kind },
      changed: true,
    }))
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

  remove = () => {
    const { _id } = this.state.set

    if (_id && confirm("Вы действительно хотите удалить коллекцию?")) {
      const params = {
        url: `admin/sets/set/${_id}`,
        method: "del",
      }

      asyncRequest(params).then(response => {
        this.props.changeRoute("removedId", _id, "replace")
        this.setState(INITIAL_STATE)
      })
    }
  }

  save = e => {
    const products = this.state.products.filter(product => !product.removed)

    const { _id, kind } = this.state.set

    const params = {
      url: `admin/sets/set/${_id}`,
      method: "put",
      data: {
        productIds: products.map(product => product._id),
        kind,
      },
    }

    asyncRequest(params).then(() =>
      this.setState(state => ({
        changed: false,
        products,
      })),
    )
  }
}

function sortProducts(products, set) {
  const { productIds } = set

  if (productIds.length !== products.length) return products

  return productIds.map(id => products.find(p => p._id === id))
}

function prepareSet(set) {
  set.created.date = getFullDate(set.created.date)
  if (set.updated) set.updated.date = getFullDate(set.updated.date)
  return set
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
  overflow: auto;
  padding: 0 15px 500px;
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
`
