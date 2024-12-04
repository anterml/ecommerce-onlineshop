import React, { Component } from "react"
import styled from "styled-components"

import Creating from "./creating"

const ROOT_IMAGE_PATH = "shop/category/furniture/kuhnya"

export default class Images extends Component {
  render() {
    const { productImageFolder, actions, part } = this.props
    const { images, imageFolder } = part
    const imagePath = `${ROOT_IMAGE_PATH}/${productImageFolder}/m/${imageFolder}`
    return (
      <Block>
        {images.map(image => (
          <Item key={image}>
            <Name>{image}</Name>
            <Image style={{ backgroundImage: `url("${imagePath}/${image}")` }}>
              <button
                onClick={this.remove}
                data-image={image}
              >
                Удалить
              </button>
            </Image>
          </Item>
        ))}
        <Creating
          imagePath={imagePath}
          actions={actions}
          part={part}
        />
      </Block>
    )
  }

  remove = e => {
    const { image } = e.target.dataset

    if (image) {
      const { part, actions } = this.props
      const newPart = {
        ...part,
        images: part.images.filter(value => value !== image),
      }

      actions.change(part, newPart)
    }
  }
}

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 0 10px 10px 0;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
  }
`

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  button {
    display: none;
    position: absolute;
    padding: 6px 15px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover button {
    display: inline-block;
  }
`

const Name = styled.div`
  width: 100%;
  padding: 6px 0;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px dashed #ccc;
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`
