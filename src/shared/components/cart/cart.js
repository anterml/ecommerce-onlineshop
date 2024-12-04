import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as CartActions from "./actions"

import Products from "./products/products"
import Order from "./order/order"

class Cart extends Component {
  static title = "Корзина"

  state = {
    order: null,
  }

  componentDidMount() {
    document.title = "Корзина"
  }

  render() {
    const { cart, actions, auth } = this.props
    const { items } = cart
    const validItems = items.filter(item => item.count > 0)

    return (
      <Block>
        {!this.state.order && items.length === 0 ? (
          <Empty>Корзина пуста</Empty>
        ) : (
          <Fragment>
            <Products
              items={items}
              actions={actions.cart}
            />
            <Order
              items={validItems}
              auth={auth}
              actions={actions.cart}
              setOrder={this.setOrder}
            />
          </Fragment>
        )}
      </Block>
    )
  }

  setOrder = order => {
    this.setState(_ => ({ order }))
  }
}

export default connect(
  state => ({
    cart: state.cart,
    auth: state.auth,
  }),
  dispatch => ({
    actions: {
      cart: bindActionCreators(CartActions, dispatch),
    },
  }),
)(Cart)

const Block = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;

  @media (max-width: 1023px) {
    flex-flow: column nowrap;
  }
`

const Empty = styled.div`
  width: 100%;
  font-size: 28px;
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
`
