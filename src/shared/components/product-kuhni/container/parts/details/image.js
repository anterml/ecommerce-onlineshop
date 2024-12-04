import React, { Component } from "react"
import styled from "styled-components"

export default class Images extends Component {
  state = {
    selectedImage: this.props.images[0] || "1.jpg",
  }

  render() {
    const { selectedImage } = this.state
    const { url, images } = this.props

    return (
      <Block>
        <BigImage>
          <img src={url + selectedImage} />
        </BigImage>
        <MiniImages>
          {images.map(image => (
            <MiniImage
              key={image}
              style={{ backgroundImage: `url("${url + image}")` }}
              selected={selectedImage === image}
              onMouseEnter={this.changeImage}
              data-image={image}
            />
          ))}
        </MiniImages>
      </Block>
    )
  }

  changeImage = e => {
    const { image } = e.currentTarget.dataset
    this.setState(() => ({ selectedImage: image }))
  }
}

const Block = styled.div``

const MiniImages = styled.div`
  display: flex;
  align-items: center;
`

const MiniImage = styled.div`
  min-height: 95px;
  min-width: 94px;
  @media (max-width: 480px) {
    min-height: 89px;
    min-width: 88px;
  }
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 1px;
  margin-right: 10px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  background-origin: content-box;
  cursor: pointer;

  ${props => props.selected && "border-bottom-color: #b30202"};
`

const BigImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;

  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`
