import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as StatsActions from "./stats/actions"
import * as ProductsActions from "./products/actions"

import Spinner from "./spinner"
import qs from "query-string"

import Stats from "./stats/stats"
import Products from "./products/products"

function getTitle(stats, url) {
  const engName = getBrandEngNameByUrl(url)
  const brand = (stats.values || []).find(brand => brand.engName === engName)
  return brand ? `Мебель фабрики ${brand.name}` : "Фабрики мебели"
}

function getBrandEngNameByUrl(url) {
  const match = "/brands/mebel/"
  const pos = url.indexOf(match)

  if (pos !== -1) {
    const [path] = url.split("?")
    return path.substr(pos + match.length).replace("/", "")
  }
}

class Brands extends Component {
  static title = (store, url) => {
    return getTitle(store.brands.stats, url) + " в магазине yoursite"
  }

  static fetchData({ dispatch, Cookie, match }) {
    const promises = [dispatch(StatsActions.fetch({ Cookie }))]

    if (typeof match.params.brand === "string") {
      const [brand, search] = match.params.brand.split("/")
      promises.push(
        dispatch(
          ProductsActions.fetch({
            brand,
            search: search || "",
            Cookie,
          }),
        ),
      )
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    const { stats, products, selectedBrand, location, actions } = this.props
    document.title = getTitle(stats, location.pathname)

    if (stats.status !== "fulfilled") {
      actions.stats.fetch()
    }
    if (products.status !== "fulfilled" && selectedBrand) {
      actions.products.fetch({
        brand: selectedBrand,
        search: location.search || "",
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, location, selectedBrand, stats, products } = this.props
    const brand = stats.values.find(brand => brand.engName === selectedBrand)
    document.title = getTitle(stats, location.pathname)

    if (brand) {
      if (
        selectedBrand !== prevProps.selectedBrand ||
        prevProps.location.search !== location.search
      ) {
        actions.products.fetch({
          brand: selectedBrand,
          search: location.search || "",
        })
      }
    } else if (products.values.length) {
      actions.products.reset()
    }
  }

  upload = () => {
    const { actions, products, selectedBrand, location } = this.props
    const page = (products.page || 0) + 1

    const search =
      "?" +
      qs.stringify({
        ...qs.parse(location.search),
        page,
      })

    return actions.products.fetch({
      brand: selectedBrand,
      search,
      page,
    })
  }

  render() {
    const { stats, products, auth, location, selectedBrand } = this.props

    if (stats.status === "pending") {
      return <Spinner />
    }

    const title = getTitle(stats, location.pathname)

    return (
      <Block>
        <h1>{title}</h1>
        <Stats {...this.props} />
        {selectedBrand ? (
          <Products
            products={products}
            auth={auth}
            upload={this.upload}
          />
        ) : (
          <Text>Выберите фабрику, чтобы посмотреть её продукцию</Text>
        )}
      </Block>
    )
  }
}

export default connect(
  (state, { match, location }) => {
    const selectedBrand = match.params.brand
    const { categories } = qs.parse(location.search)
    const selectedCategories = categories ? categories.split(";") : []

    return {
      auth: state.auth,
      stats: state.brands.stats,
      selectedBrand,
      selectedCategories,
      products: state.brands.products,
    }
  },
  dispatch => ({
    actions: {
      stats: bindActionCreators(StatsActions, dispatch),
      products: bindActionCreators(ProductsActions, dispatch),
    },
  }),
)(Brands)

const Block = styled.div`
  min-height: 1000px;

  h1 {
    margin: 30px 0;
  }
`

const Text = styled.div`
  margin-top: 100px;
  font-size: 26px;
  line-height: 32px;
  color: #999;
  text-align: center;
`
