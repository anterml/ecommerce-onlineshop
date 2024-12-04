import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import request from "utils/request-with-cancel"
import * as CartActions from "../cart/actions"
import Spinner from "globalComponents/spinners/circle"

class Order extends Component {
  static title = "Ваш заказ"

  state = {
    status: "pending",
    code: null,
  }

  componentDidMount() {
    document.title = this.constructor.title
    this.requests = []
    const { id } = this.props.match.params

    if (id) this.load(id)
  }

  load = id => {
    this.asyncRequest(
      { url: "order/yandex-kassa/get-payment-by-order-id/" + id },
      this.successLoad,
      this.errorLoad,
    )
  }

  successLoad = ({ code, paymentStatus }) => {
    switch (paymentStatus) {
      case "pending":
        return this.props.history.replace({ pathname: "/cart" })

      case "succeeded": {
        this.setState(_ => ({ status: "fulfilled", code }))
        return this.props.actions.cart.removeAll()
      }

      default:
        this.errorLoad()
    }
  }

  errorLoad = () => {
    this.setState(_ => ({ status: "rejected" }))
  }

  componentWillUnmount() {
    this.requests.map(request => request.cancel())
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    this.request = request(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )

    this.requests.push(this.request)
  }

  render() {
    const { id } = this.props.match.params
    const { status, code } = this.state

    if (!id || status === "rejected")
      return <Block>Не получилось найти заказ</Block>

    if (status === "pending")
      return (
        <Block>
          <Spinner borderWidth="6" />
        </Block>
      )

    return (
      <Block>
        Ваш заказ номер <strong>{code}</strong> успешно оформлен и оплачен.
        <br />
        <br />
        Спасибо за покупку.
      </Block>
    )
  }
}

export default connect(
  state => ({
    cart: state.cart,
  }),
  dispatch => ({
    actions: {
      cart: bindActionCreators(CartActions, dispatch),
    },
  }),
)(Order)

const Block = styled.div`
  padding: 50px 0;
  font-size: 20px;
  text-align: center;
  line-height: 28px;
  color: #555;
`
