import React, { Component } from "react"
import styled from "styled-components"
import request from "utils/request-with-cancel"

const payments = {
  "shop:mebelwood": "в магазине МебельВуд",
  "shop:mebelcity": "в магазине МебельСити",
  "shop:mebelhouse": "в магазине МебельХаус",
  "on-delivery": "при получении",
  "online": "онлайн",
}

const initialState = {
  status: null,
  paymentStatus: "",
}

export default class Payment extends Component {
  state = initialState

  componentDidMount() {
    const { orderId } = this.props
    if (orderId) this.getPayment(orderId)
  }

  componentDidUpdate(prevProps) {
    const { orderId } = this.props
    if (orderId && orderId !== prevProps.orderId) this.getPayment(orderId)
  }

  getPayment = orderId => {
    if (this.props.kassa) {
      this.asyncRequest(
        { url: "order/yandex-kassa/get-payment/" + orderId },
        ({ paymentStatus }) =>
          this.setState(_ => ({ status: "fulfilled", paymentStatus })),
        () => this.setState(_ => ({ status: "rejected", paymentStatus: "" })),
      )
    } else {
      this.setState(_ => initialState)
    }
  }

  componentWillUnmount() {
    if (this.request) this.request.cancel()
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    if (this.request) this.request.cancel()

    this.request = request(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )
  }

  render() {
    const { payment } = this.props

    if (payment === "online") {
      return this.getPaymentDetails()
    }

    return (
      <Block>
        <span>Оплата {payments[payment] || ""}</span>
      </Block>
    )
  }

  getPaymentDetails = () => {
    const { paymentStatus, status } = this.state

    switch (status) {
      case "pending":
        return "Загружается информация по платежу..."

      case "fulfilled":
        return <span>{paymentStatus}</span>

      case "rejected":
        ;<span>Не получилось получить информацию о платеже</span>

      default:
        return null
    }
  }
}

const Block = styled.div`
  margin: 30px 0;
  text-align: right;

  span {
    display: inline-block;
    padding: 6px 10px;
    background: #e8e8e8;
    color: #333;
    font-weight: 500;
    border-radius: 2px;
  }
`
