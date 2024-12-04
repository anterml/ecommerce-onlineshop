import React, { Component } from "react"
import styled from "styled-components"

export default class ImagePopup extends Component {
  constructor(props) {
    super(props)
    this.scrollY = window.scrollY
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", this.handleArrowKeys)
  }

  render() {
    const { rootImageUrl, image, close } = this.props
    return (
      <Block>
        <Overlay onClick={close} />
        <Img src={`${rootImageUrl}/contacts/${image}.jpg`} />
      </Block>
    )
  }

  handleArrowKeys = e => {
    const event = e || window.event
    if (event.key === "Escape" || event.keyCode === "27")
      return this.props.close()
  }

  componentWillUnmount() {
    document.body.style.overflow = ""
    window.scrollTo(0, this.scrollY)
    window.removeEventListener("keydown", this.handleArrowKeys)
  }
}

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
`

const Img = styled.img`
  margin: 0 auto;
  display: block;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 0 2px 2px #aaa;
  position: relative;
  border-radius: 3px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background-color: rgba(237, 237, 237, 0.95);
`
