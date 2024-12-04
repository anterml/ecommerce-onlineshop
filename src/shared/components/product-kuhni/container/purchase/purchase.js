import React, { Component, Fragment } from "react"
import styled from "styled-components"

import Popup from "./popup"

export default class Purchase extends Component {
  state = {
    popup: false,
  }

  render() {
    const {
      product,
      cart,
      totalPrice,
      image,
      actions,
      history,
      configurationCode,
      parts,
    } = this.props
    const { popup } = this.state

    return (
      <Fragment>
        <AddButton onClick={this.showPopup}>
          {this.findInCart() ? "В корзине" : "Купить"}
        </AddButton>
        {popup && (
          <Popup
            close={this.closePopup}
            product={product}
            cart={cart}
            totalPrice={totalPrice}
            image={image}
            actions={actions}
            history={history}
            configurationCode={configurationCode}
            parts={parts}
          />
        )}
      </Fragment>
    )
  }

  findInCart() {
    const { cart, configurationCode, product } = this.props
    return cart.items.find(
      item =>
        item.productCode === product.base.productCode &&
        item.configurationCode === configurationCode,
    )
  }

  closePopup = e => {
    //this.addInCart()
    this.setState(state => ({ popup: false }))
  }

  showPopup = () => {
    const product = this.findInCart()
    if (product) this.props.actions.remove(product)
    else this.setState(state => ({ popup: true }))
  }
}

const AddButton = styled.button`
  flex: 0 0 50%;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  border: 1px solid #135076;
  border-radius: 2px;
  background-color: #00a0ff;
  background-image: url(shop/textures/1.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  cursor: pointer;

  &:hover {
    background-color: #008ee3;
  }
`
