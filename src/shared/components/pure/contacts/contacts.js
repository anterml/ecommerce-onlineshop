import React, { PureComponent } from "react"
import styled from "styled-components"
import Info from "./info"
import Map from "./map"
import Requisite from "./requisite"
import ImagePopup from "./imagePopup"

const ROOT_IMAGE_URL = "shop/stuff"

export default class Contacts extends PureComponent {
  static title = "Контакты"

  state = {
    image: "",
  }

  componentDidMount() {
    document.title = "Контакты"
    window.scrollTo(0, 0)
  }

  render() {
    const { image } = this.state

    return (
      <Block>
        <h1>Контакты</h1>
        {/*
        <Info rootImageUrl={ROOT_IMAGE_URL} showImage={this.showImage} />
        <Map />
        */}
        <Requisite />
        {image && (
          <ImagePopup
            image={image}
            rootImageUrl={ROOT_IMAGE_URL}
            close={this.closeImage}
          />
        )}
      </Block>
    )
  }

  showImage = e => {
    const { image } = e.currentTarget.dataset
    if (image && typeof window !== "undefined" && window.outerWidth >= 1024)
      this.setState(state => ({ image }))
  }

  closeImage = () => {
    this.setState(state => ({ image: "" }))
  }
}

const Block = styled.main`
  margin-bottom: 70px;
  padding-top: 20px;

  & h1 {
    margin-bottom: 45px;
  }
`
