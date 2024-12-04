import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as ProductActions from "./actions"

import Spinner from "globalComponents/spinners/circle"
import Placeholder from "./block/placeholder"
import Block from "./block/block"
import Categories from "./categories/categories"

class Products extends Component {
  static fetchData({ dispatch }) {
    return dispatch(ProductActions.fetch())
  }

  componentDidMount() {
    const { actions, products } = this.props
    if (products.status !== "fulfilled" && window.outerWidth >= 768) {
      actions.products.fetch()
    }
  }

  render() {
    const { blocks, items, status } = this.props.products

    return (
      <div id="product-sliders">
        <Layout>
          {status === "pending" ? (
            <Placeholder />
          ) : (
            blocks.slice(0, 1).map(({ name, ids }) => (
              <Block
                name={name}
                value={items[name]}
                count={ids.length}
                upload={this.upload}
                key={name}
              />
            ))
          )}
        </Layout>
        <Categories />
        <Layout>
          {status === "pending" ? (
            <Spinner
              align="center"
              h="381px"
            />
          ) : (
            blocks.slice(1).map(({ name, ids }) => (
              <Block
                name={name}
                value={items[name]}
                count={ids.length}
                upload={this.upload}
                key={name}
              />
            ))
          )}
        </Layout>
      </div>
    )
  }

  upload = blockName => {
    const {
      actions,
      products: { blocks, items, uploadedBlocks },
    } = this.props

    // игнорируем если уже подгружали данные для этого блока
    if (uploadedBlocks.includes(blockName)) return

    const block = blocks.find(block => block.name === blockName)
    const products = items[blockName]

    if (!block || !products) return

    const productIds = products.map(product => product._id)
    const blockIds = block.ids.filter(id => !productIds.includes(id))

    if (blockIds.length) {
      blockIds.sort()
      actions.products.upload(blockName, blockIds.join("-"))
    }
  }
}

export default connect(
  state => ({
    products: state.main,
  }),
  dispatch => ({
    actions: {
      products: bindActionCreators(ProductActions, dispatch),
    },
  }),
)(Products)

const Layout = styled.div`
  &:not(:last-child) {
    margin-bottom: 50px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`
