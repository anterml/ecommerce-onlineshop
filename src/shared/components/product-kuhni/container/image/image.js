import React, { Component } from "react"
import styled from "styled-components"

import Slider from "./mini/slider"
import List from "./mini/list"
import Popup from "./popup/popup"

const rootImageUrl = "shop/category/"

export default class Image extends Component {
  state = {
    imageUrl: "",
    imagePos: false,
  }

  componentDidUpdate(prevProps) {
    const { imageUrl, urlName, selectedVars } = this.props
    // clear previous state while transition from the products slider
    if (urlName && urlName !== prevProps.urlName) {
      this.setState({
        imageUrl,
        imagePos: false,
      })
    } else if (selectedVars !== prevProps.selectedVars) {
      this.setState({ imageUrl })
    }
  }

  render() {
    const { imageFolder, category, urlName, imageUrl, images, fullName } =
      this.props
    const department = category === "sp_phone" ? "electronics" : "furniture"
    const imagePath = `${rootImageUrl + department}/${category}/${imageFolder}/`
    this.currentImage = this.state.imageUrl || imageUrl || "1.jpg"
    const backgroundImage = imagePath + this.currentImage
    const { imagePos } = this.state

    return (
      <Block onMouseLeave={this.restoreImage}>
        <Picture
          onClick={this.showPopup}
          data-image={this.currentImage}
        >
          <Wrap>
            <img
              src={backgroundImage}
              title={fullName}
              alt={fullName}
              itemProp="image"
            />
          </Wrap>
          <PictureOverlay />
        </Picture>

        {images.length > 1 && (
          <Mini>
            <Slider
              lineCount={4}
              count={images.length}
              keyValue={urlName}
              clickOnItem={this.changeConfigurationByImageClick}
            >
              <List
                images={images}
                imagePath={imagePath}
                current={this.currentImage}
                change={this.changeImage}
              />
            </Slider>
          </Mini>
        )}
        {typeof imagePos === "number" && (
          <Popup
            images={images}
            pos={imagePos}
            imagePath={imagePath}
            close={this.closePopup}
          />
        )}
      </Block>
    )
  }

  showPopup = e => {
    const { image } = e.currentTarget.dataset
    const imagePos = this.props.images.indexOf(image)
    this.setState({ imagePos })
  }

  closePopup = () => {
    this.setState({ imagePos: false })
  }

  changeConfigurationByImageClick = e => {
    const { imageUrl } = e.target.dataset

    if (imageUrl) {
      const needSave = this.props.changeConfigurationByImageClick(imageUrl)
      // сохраняем только привязанные картинки, а не всякие в интерьере и т.п.
      if (needSave) this.saveImage = this.state.imageUrl || this.props.imageUrl
    }
  }

  // temporarily change the image on hover
  changeImage = e => {
    const { imageUrl } = e.target.dataset

    if (imageUrl && imageUrl !== this.state.imageUrl)
      this.setState(state => ({ imageUrl }))
  }

  restoreImage = () => {
    this.setState({ imageUrl: this.saveImage || this.props.imageUrl })
    this.saveImage = null
  }
}

const Block = styled.div`
  width: 100%;
`

const Picture = styled.div`
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 2px;
  text-align: center;
  height: 250px;

  @media (min-width: 768px) {
    height: 550px;
  }

  &:before {
    display: none;
    position: absolute;
    font-size: 20px;
    font-weight: 500;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: attr(data-image);
    z-index: -1;
  }

  .isAdmin &:before {
    display: inline-block;
  }
`

const PictureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .isAdmin & {
    display: none;
  }
`

const Mini = styled.div`
  padding: 20px 0;
  display: flex;
`

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`
