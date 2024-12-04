import React, { Component } from "react"
import styled from "styled-components"
import loadable from "loadable-components"
import { engPlaceNames } from "utils/data/instock-places"

const Info = loadable(() => import("./info"))

export default class InstockPlaces extends Component {
  state = {
    popup: false,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.closePopupByEsc)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closePopupByEsc)
  }

  render() {
    const { places } = this.props

    return (
      <Block>
        <Value>В наличии</Value>
        <Shops onClick={this.showPopup}>
          в {places.length} магазин{places.length === 1 ? "е" : "ах"}
        </Shops>
        {this.state.popup && (
          <Info
            hidePopup={this.hidePopup}
            shopNames={places.map(index => engPlaceNames[index])}
          />
        )}
      </Block>
    )
  }

  showPopup = e => {
    this.setState(state => ({ popup: true }))
  }

  hidePopup = e => {
    this.setState(state => ({ popup: false }))
  }

  closePopupByEsc = e => {
    if (e.key === "Escape" || e.keyCode === "27") {
      this.setState(state => ({ popup: false }))
    }
  }
}

const Block = styled.div`
  display: flex;
`

const Value = styled.span`
  color: #666;
  margin-right: 3px;
`

const Shops = styled.span`
  cursor: pointer;
  color: #3b7ba7;
  text-decoration: underline;

  &:hover {
    color: #2c5571;
  }
`
