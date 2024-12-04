import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as Actions from "./actions"

import Slider from "./slider"
import List from "./list"

const LINE_COUNT = 9

class ProductSlider extends Component {
  componentDidMount() {
    const { products, category, actions } = this.props

    if (!products.status || products.category !== category) {
      actions.fetch(category)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { category, actions } = this.props
    if (category && category !== prevProps.category) actions.fetch(category)
  }

  render() {
    const { category, urlName, products, auth } = this.props
    const { value, status } = products

    return (
      <Block>
        {status === "pending" && <Overlay>Загрузка продуктов</Overlay>}
        <Slider
          keyValue={category}
          count={value.length}
          lineCount={LINE_COUNT}
          clickOnItem={this.select}
          handleRight={this.load}
          pages={Math.ceil(value.length / LINE_COUNT)}
        >
          <List
            category={category}
            values={value}
            isAdmin={auth.admin}
            urlName={urlName}
          />
        </Slider>
      </Block>
    )
  }

  select = e => {
    e.preventDefault()
    const href = e.target.getAttribute("href")
    if (href) this.props.history.push(href)
  }

  load = page => {
    const { category, actions } = this.props
    actions.fetch(category, LINE_COUNT * page)
  }
}

export default connect(
  state => ({
    product: state.product.product,
    products: state.product.productSlider,
    auth: state.auth,
  }),
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
  }),
)(ProductSlider)

const Block = styled.div`
  display: flex;
  overflow: auto;
  margin: 10px 0 15px;
  border-bottom: 1px solid #ddd;
  min-height: 131px;
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #aaa;
  font-size: 20px;
  font-weight: 300;
  z-index: 2;
`
