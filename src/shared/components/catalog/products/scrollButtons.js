import React, { Component } from "react"
import styled from "styled-components"

import Icon from "globalComponents/icons/svg"

export default class Scroll extends Component {
  componentDidMount() {
    this.addScrollButton()
  }

  addScrollButton() {
    const { containerName } = this.props
    let productBlock = document.getElementById(containerName)
    let scrollButton = document.getElementById("scroll-button")
    let pointerEvents = false
    let timer

    this.scrollButtonEvent = () => {
      // не показывать кнопку на мобильных устроствах
      if (window.outerWidth < 768) return

      clearTimeout(timer)

      if (!pointerEvents) {
        pointerEvents = true
        document.body.style.pointerEvents = "none"
      }

      timer = setTimeout(() => {
        document.body.style.pointerEvents = ""
        pointerEvents = false
      }, 200)

      if (!productBlock) productBlock = document.getElementById(containerName)

      if (!scrollButton) scrollButton = document.getElementById("scroll-button")

      if (window.scrollY > 200) {
        let offset = -20
        let extraCss = ""

        if (window.innerWidth > 1380) {
          offset = 40
          extraCss = "bottom: 50%; transform: translateY(50%)"
        }

        const { left, width } = productBlock.getBoundingClientRect()
        scrollButton.style.cssText = `left: ${
          left + width + offset
        }px; display: block; ${extraCss}`
      } else {
        scrollButton.style.display = "none"
      }
    }

    document.addEventListener("scroll", this.scrollButtonEvent)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollButtonEvent)
  }

  render() {
    return (
      <Block id="scroll-button">
        <Button scroll={this.scrollTop} />
        <Button
          scroll={this.scrollBottom}
          direction="down"
        />
      </Block>
    )
  }

  scrollTop() {
    window.scrollTo(0, 200)
  }

  scrollBottom() {
    const moreProductsButton = document.getElementById("product-list-ending")
    const y = window.innerHeight
    if (moreProductsButton) {
      const { bottom } = moreProductsButton.getBoundingClientRect()
      const y = bottom + window.scrollY - 450
      window.scrollTo(0, y)
    }
  }
}

const Button = ({ scroll, direction }) => (
  <Item onClick={scroll}>
    <Arrow direction={direction}>
      <Icon name="arrow-2" />
    </Arrow>
  </Item>
)

const Block = styled.div`
  display: none;
  position: fixed;
  bottom: 50px;
  z-index: 100;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
`

const Item = styled.div`
  padding: 10px;
  cursor: pointer;

  &:first-child {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background-color: rgba(127, 127, 127, 0.35);
  }
`

const Arrow = styled.div`
  width: 22px;
  height: 22px;
  color: #555;
  display: block;
  cursor: pointer;
  transform: rotate(${props => (props.direction === "down" ? 90 : 270)}deg);

  &:hover {
    color: #222;
  }
`
