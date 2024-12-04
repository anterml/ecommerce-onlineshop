import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import request from "utils/request-with-cancel"
import { engPlaceNames } from "utils/data/instock-places"

import AddProduct from "./add-product/add-product.js"
import List from "./list/list"
import Spinner from "globalComponents/spinners/circle"

const url = "admin/instock-products"

class InstockProducts extends Component {
  static title = "Товары в магазинах"

  state = {
    productsStatus: "pending",
    status: null,
    products: [],
  }

  componentDidMount() {
    document.title = this.constructor.title
    this.requests = []
    this.load()
  }

  componentWillUnmount() {
    this.requests.map(request => request.cancel())
  }

  load = e => {
    this.asyncRequest(
      { url: url + "/list" },
      products => {
        this.setState(state => ({ products, productsStatus: null }))
      },
      () => {
        this.setState(state => ({ productsStatus: "rejected" }))
      },
    )
  }

  render() {
    const { products, status, productsStatus } = this.state
    const { allowShops } = this.props
    const { change, add } = this

    if (!allowShops.length)
      return <Error>У вас нет доступа. Обратитесь к администратору.</Error>

    if (productsStatus === "rejected")
      return (
        <Error>
          Не получилось загрузить товары. Попробуйте обновить страницу.
        </Error>
      )

    if (productsStatus === "pending") return <Spinner borderWidth="6" />

    return (
      <Block>
        <AddProduct add={add} />
        <List {...{ allowShops, products, change, status }} />
      </Block>
    )
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    this.request = request(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )

    this.requests.push(this.request)
  }

  add = (productCode, confCode) => {
    const product = this.state.products.find(
      product => product.base.productCode === productCode,
    )

    // если продукт уже есть, тогда скролим на его позицию
    if (product) {
      return setFocus({ code: product.base.productCode })
    }

    setFocus({ y: 0 })
    this.setState(state => ({ status: "pending" }))

    this.asyncRequest(
      { url: `${url}/productCode/${productCode}` },
      product => {
        this.setState(state => ({
          products: [product, ...state.products],
          status: null,
        }))

        const allowPlaceIndexes = this.props.allowShops
          .map(shopName => engPlaceNames.indexOf(shopName))
          .filter(index => index !== -1)

        if (allowPlaceIndexes.length === 1)
          this.update(product, allowPlaceIndexes)
      },
      error => {
        const status =
          error.status === 404
            ? "Товар не найден"
            : "Не получилось загрузить товары"
        this.setState(state => ({ status }))
      },
    )
  }

  change = e => {
    const { id } = e.target.dataset
    const placeIndex = Number(e.target.dataset.placeIndex)
    const product = this.state.products.find(p => p._id === id)

    if (!product) return

    const instockPlaces = product.instockPlaces.includes(placeIndex)
      ? product.instockPlaces.filter(index => index !== placeIndex)
      : [...product.instockPlaces, placeIndex]

    this.update(product, instockPlaces)
  }

  update = (product, instockPlaces) => {
    const update = product => {
      this.setState(state => ({
        products: state.products.map(p =>
          p._id !== product._id ? p : product,
        ),
      }))
    }

    update({ ...product, instockPlaces })

    this.asyncRequest(
      {
        url: `${url}/${product._id}`,
        method: "put",
        data: instockPlaces,
      },
      () => {},
      error => {
        console.log("Failed to update instock place")
        update(product)
      },
    )
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    allowShops: getShops(state.auth.accessList),
  }
})(InstockProducts)

const getShops = accessList => {
  const prefixAccessName = "#a-instock-products-"

  return engPlaceNames.filter(value =>
    accessList.includes(prefixAccessName + value),
  )
}

function setFocus({ code, y }) {
  const block = document.getElementById("block")
  if (block) {
    if (typeof y === "number") return block.scrollTo(0, y)

    const elem = document.querySelector(`[data-code="${code}"]`)
    if (elem) {
      block.scrollTo(0, elem.offsetTop)
    }
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  overflow: hidden;
`

const Error = styled.div`
  color: #b30202;
  text-align: center;
  margin-top: 100px;
  font-size: 22px;
`
