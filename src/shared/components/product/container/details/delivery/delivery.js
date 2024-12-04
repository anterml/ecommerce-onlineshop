import React, { Component, Fragment } from "react"
import styled from "styled-components"
import loadable from "loadable-components"
const Popup = loadable(() => import("./popup"))

export default class Delivery extends Component {
  state = {
    popup: false,
    tab: "delivery",
  }

  render() {
    const { popup, tab } = this.state
    const { minFreePrice } = this.props

    return (
      <Fragment>
        <ButtonLink onClick={this.show}>Условия доставки и оплаты</ButtonLink>
        {popup && (
          <Popup
            hide={this.hide}
            tab={tab}
            minFreePrice={minFreePrice}
            changeTab={this.changeTab}
          />
        )}
      </Fragment>
    )
  }

  changeTab = e => {
    const { tab } = e.target.dataset
    if (tab && tab !== this.state.tab) this.setState(state => ({ tab }))
  }

  hide = () => {
    this.setState(state => ({ popup: false }))
  }

  show = () => {
    this.setState(state => ({ popup: true }))
  }
}

const ButtonLink = styled.div`
  color: #3b7ba7;
  margin-bottom: 20px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #2c5571;
  }
`
