import React, { Component } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import prettyPrice from "utils/prettyPrice"

import List from "./list"

export default class Products extends Component {
  state = {
    status: "",
    value: [],
  }

  componentDidMount() {
    const { userName, date } = this.props
    if (userName && date) this.load(userName, date)
  }

  componentDidUpdate(prevProps, prevState) {
    const { userName, date } = this.props
    if (
      userName &&
      date &&
      (userName !== prevProps.userName || date !== prevProps.date)
    )
      this.load(userName, date)
  }

  async load(userName, date) {
    this.setState(state => ({ status: "pending" }))

    try {
      const value = await asyncRequest({
        url: `admin/stats/employees/products/${userName}/${date}`,
      })

      this.setState(state => ({
        status: "fulfilled",
        value: this.prepare(value),
      }))
    } catch (e) {
      console.log(e)
      this.setState(state => ({ status: "rejected" }))
    }
  }

  prepare(products) {
    products.forEach(product => {
      const { creating, base } = product
      product.date = creating && creating.date ? prepareDate(creating.date) : ""
      product.prettyPrice = prettyPrice(base.price)
    })
    return products
  }

  render() {
    const { value, status } = this.state
    const { date } = this.props

    if (!date || status === "pending") return null

    return (
      <Block>
        <Title>
          <DateTime>{date}</DateTime>
          <Count>Cоздано {value.length} продуктов</Count>
        </Title>
        <List products={value} />
      </Block>
    )
  }
}

function prepareDate(date) {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
  })

  return formatter.format(new Date(date))
}

const Title = styled.div`
  margin: 30px 0;
`

const DateTime = styled.span`
  font-weight: 500;
  font-size: 20px;
  margin-right: 8px;
`

const Count = styled.span`
  color: #666;
`

const Block = styled.div`
  padding-bottom: 150px;
`
