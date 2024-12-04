import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import qs from "query-string"

import * as ProductActions from "../product/actions"
import * as CartActions from "../cart/actions"

import Spinner from "../product/spinner"
import ProductSlider3 from "../product/productSlider3/productSlider"
import Container from "./container/container"

import ErrorBoundary from "./container/errorBoundary"

import { Route } from "react-router-dom"

const Status = ({ code, children }) => (
  <Route
    render={staticContext => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

const NotFound = () => (
  <Status code={404}>
    <StatusText>Продукт не найден</StatusText>
  </Status>
)

class ProductContainer extends Component {
  static title(store) {
    let product = {}
    if (store && store.product.product.status === "fulfilled") {
      product = store.product.product.value || {}
    }

    const { name, kind } = product.base || {}
    const fullName = (kind ? kind + " " : "") + (name || "")

    return fullName || "Продукт"
  }

  static fetchData({ dispatch, params, Cookie }) {
    return dispatch(
      ProductActions.fetch({
        urlName: params.urlName,
        Cookie,
        isServerSide: true,
      }),
    )
  }

  componentDidMount() {
    const { product, actions, match } = this.props
    const { urlName } = match.params

    // если не загружен продукт, загрузить его и коллекцию
    if (!product.status || (product.value.base || {}).urlName !== urlName) {
      actions.product.fetch({ urlName }).then(({ response }) => {
        this.setTitle(response)
      })
    } else {
      // если продукт загружен, а коллекция еще нет
    }

    setTimeout(() => {
      window.scrollTo(0, window.outerWidth >= 768 ? 103 : 0)
    }, 50)
  }

  setTitle(product) {
    if (!product) return ""

    const { kind, name } = product.base || {}
    document.title = (kind ? kind + " " : "") + name
  }

  componentWillReceiveProps(nextProp) {
    const { actions, match } = this.props
    const { urlName } = nextProp.match.params
    if (urlName !== match.params.urlName) {
      actions.product.fetch({ urlName }).then(({ response }) => {
        this.setTitle(response)
      })
    }
  }

  render() {
    const { product, match, location, history, actions, cart, auth } =
      this.props
    const query = qs.parse(location.search)
    // временно установить категорию для кухонь
    // т.к. path равен /mebel/kuhnya/:urlName'
    // а не /mebel/:category/:urlName'
    match.params.category = "kuhnya"
    const { category, urlName } = match.params

    if (product.error && product.error.status === 404) {
      return (
        <Block>
          <NotFound />
        </Block>
      )
    }

    return (
      <Fragment>
        <ProductSlider3
          {...{ category, urlName, match, actions, location, history }}
        />

        {product.value._id ? (
          <ErrorBoundary status={product.status}>
            <Container
              product={product.value}
              status={product.status}
              query={query}
              location={location}
              history={history}
              actions={actions}
              auth={auth}
              cart={cart}
              department={match.params["0"]}
            />
          </ErrorBoundary>
        ) : (
          <Block>
            <Spinner />
          </Block>
        )}
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    product: state.product.product,
    cart: state.cart,
    auth: state.auth,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(ProductActions, dispatch),
      cart: bindActionCreators(CartActions, dispatch),
    },
  }),
)(ProductContainer)

const Block = styled.div`
  position: relative;
  min-height: 500px;
  padding: 50px 0;
`

const StatusText = styled.div`
  height: 100%;
  text-align: center;
  color: #b30202;
  font-size: 20px;
  font-weight: 500;
`
