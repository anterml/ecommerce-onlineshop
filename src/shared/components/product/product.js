import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import qs from "query-string"

import * as ProductActions from "./actions"
import * as CartActions from "../cart/actions"
import Spinner from "./spinner"

import ProductSlider from "./productSlider/productSlider"
import ProductSlider3 from "./productSlider3/productSlider"
import Container from "./container/container"
import CrossSell from "./crossSell/crossSell"

import ErrorClientHandler from "./container/error-client-handler"
import ErrorServerHandler from "./container/error-server-handler"
import recentlyViewedProducts from "utils/localstorage/recently-viewed-products"
import RecentlyViewedProducts from "globalComponents/recently-viewed-products/recently-viewed-products"

const setLocalstorage = ({ _id, base, category }) => {
  if (typeof window !== "undefined") {
    recentlyViewedProducts({ _id, base, category })
  }
}

const Ecommerce = {
  detail({ base, category }, search, auth) {
    if (
      !auth ||
      auth.userId !== "58d4b6875bb1540004e174c7" ||
      category !== "tumba"
    )
      return
    const query = qs.parse(search)
    const cc = query.pc ? "#" + query.pc : ""
    const { price, productCode, name, kind } = base

    console.log({
      id: productCode + cc,
      name: kind + " " + name,
      price,
      category: `Мебель/${kind}`,
    })

    dataLayer.push({
      ecommerce: {
        currencyCode: "RUB",
        detail: {
          products: [
            {
              id: productCode + cc,
              name: kind + " " + name,
              price,
              category: `Мебель/${kind}`,
              quantity: 1,
            },
          ],
        },
      },
    })
  },
}

class ProductContainer extends Component {
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
    const { product, actions, match, location, auth } = this.props
    const { urlName } = match.params
    // если не загружен продукт
    if (
      !product.status ||
      ((product.value.base || {}).urlName !== urlName &&
        product.errorUrlName !== urlName)
    ) {
      actions.product.fetch({ urlName }).then(({ response }) => {
        this.setTitle(response)
        setLocalstorage(response)
        Ecommerce.detail(product, location.search, auth)
      })
    } else {
      setLocalstorage(product.value)
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
        setLocalstorage(response)
        this.setTitle(response)
        Ecommerce.detail(response, nextProp.location.search, nextProp.auth)
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { product, location, match, auth } = this.props
    if (
      prevProps.match.params.urlName === match.params.urlName &&
      prevProps.location.search !== location.search
    ) {
      Ecommerce.detail(product.value, location.search, auth)
    }
  }

  render() {
    const { product, match, location, history, actions, cart, auth } =
      this.props
    const query = qs.parse(location.search)
    const { category, urlName } = match.params

    if (product.error) {
      return (
        <Block>
          <ErrorServerHandler code={product.error.status} />
        </Block>
      )
    }

    return (
      <Fragment>
        {auth && auth.admin ? (
          <ProductSlider3
            {...{ category, urlName, match, actions, location, history }}
          />
        ) : (
          <ProductSlider
            {...{ category, urlName, match, actions, location, history }}
          />
        )}

        {product.value._id ? (
          <ErrorClientHandler status={product.status}>
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
          </ErrorClientHandler>
        ) : (
          <Block>
            <Spinner />
          </Block>
        )}
        <CrossSell
          urlName={urlName}
          category={category}
        />
        <RecentlyViewedProducts
          urlName={urlName}
          needUpdate={this.needUpdate}
        />
      </Fragment>
    )
  }

  needUpdate = (prevProps, currProps) => {
    return currProps.urlName !== prevProps.urlName
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
