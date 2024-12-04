import React, { Component } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import prettyPrice from "utils/prettyPrice"
import { getFullDate } from "utils/date"
import Spinner from "globalComponents/spinners/inline"
import qs from "query-string"

import Listing from "./listing/listing"
import Order from "./order/order"
import STATUS_LIST from "./statusList"

class Orders extends Component {
  static title = "Заказы"

  state = {
    status: null,
    orders: [],
  }

  componentDidMount() {
    document.title = Orders.title
    if (!this.state.status) {
      this.fetch()
    }
  }

  async fetch(status) {
    this.setState(state => ({ status: "pending" }))

    try {
      const orders = await asyncRequest({
        url: `admin/orders/status=${status || "all"}`,
      })

      this.setState(state => ({
        status: "fulfilled",
        orders: prepare(orders),
      }))
    } catch (e) {
      this.setState(state => ({
        status: "rejected",
      }))
    }
  }

  render() {
    const { status, orders } = this.state
    this.selectedId = qs.parse(this.props.location.search).id
    this.order = orders.find(order => order._id === this.selectedId)
    const { selectedId, order, select, remove, changeStatus, addComment } = this

    if (status === "pending") {
      return (
        <SpinnerWrap>
          <Spinner borderWidth="6" />
        </SpinnerWrap>
      )
    }

    if (status === "rejected")
      return <DefaultText>Не удалось загрузить заказы</DefaultText>

    if (!orders.length && status === "fulfilled")
      return <DefaultText>Заказов нет</DefaultText>

    return (
      <Block>
        <Listing {...{ orders, selectedId, select }} />
        {order ? (
          <Order {...{ order, remove, changeStatus, addComment }} />
        ) : (
          <DefaultText>Выберите заказ</DefaultText>
        )}
      </Block>
    )
  }

  remove = e => {
    if (confirm("Уверены, что хотите удалить заказ?")) {
      this.setState(state => ({
        orders: state.orders.filter(order => order !== this.order),
      }))

      const params = {
        url: "admin/orders/order/" + this.selectedId,
        method: "del",
      }
      asyncRequest(params).catch(() => alert("Не удалось удалить заказ"))

      // clear order id url param
      this.changeRoute("")
    }
  }

  changeStatus = e => {
    const status = parseInt(e.target.value)

    if (typeof status !== "number" || Number.isNaN(status)) return

    this.setState(state => ({
      orders: state.orders.map(order =>
        order !== this.order
          ? order
          : {
              ...this.order,
              status,
            },
      ),
    }))

    const params = {
      url: "admin/orders/order/" + this.selectedId,
      method: "put",
      data: {
        status,
      },
    }
    asyncRequest(params).catch(() => alert("Не удалось изменить статус заказа"))
  }

  addComment = text => {
    const comment = {
      text,
      userName: "Вы только что добавили коммент",
      date: getFullDate(Date.now()),
    }

    const params = {
      url: "admin/orders/order/" + this.selectedId,
      method: "put",
      data: { action: "addComment", text },
    }

    asyncRequest(params).then(
      response => {
        const comment = response.$push.adminComments
        comment.date = getFullDate(comment.date)

        this.setState(state => ({
          orders: state.orders.map(order =>
            order !== this.order
              ? order
              : {
                  ...order,
                  adminComments: [...order.adminComments, comment],
                },
          ),
        }))
      },
      () => alert("Не удалось добавить комментарий"),
    )
  }

  select = e => {
    const { id } = e.target.dataset
    this.changeRoute(id)
  }

  changeRoute = id => {
    const { location, history } = this.props
    const query = qs.parse(location.search)
    if (id && id !== query.id) {
      const search = qs.stringify({ ...query, id })
      history.push({
        pathname: location.pathname,
        search,
      })
    }
  }
}

export default Orders

function prepare(orders) {
  orders.forEach(order => {
    order.createdAt = getFullDate(order.createdAt)
    order.prettyPrice = prettyPrice(order.totalPrice + order.delivery.price)

    if (Array.isArray(order.changingHistory)) {
      order.changingHistory.forEach(history => {
        history.date = getFullDate(history.date)
        history.author = history.author.name
        if (history.name === "status") {
          history.runame = "Статус заказа"
          history.value = STATUS_LIST[history.value] || "N/A"
        }
      })

      order.lastStatus = order.changingHistory.find(
        history => history.name === "status",
      )
    }

    order.adminComments.forEach(comment => {
      comment.date = getFullDate(comment.date)
    })
  })

  return orders
}

const DefaultText = styled.div`
  width: 100%;
  margin-top: 100px;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  color: #b5b5b5;
`

const Block = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const SpinnerWrap = styled.div`
  margin: 100px auto 0;
  text-align: center;
  width: 50px;
  height: 50px;
`
