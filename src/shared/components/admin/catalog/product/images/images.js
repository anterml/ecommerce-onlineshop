import React, { PureComponent } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import Image from "./image"
const rootImageUrl = "shop/category"

export default class Images extends PureComponent {
  state = {
    image: "",
  }

  render() {
    const { images, category, imageFolder } = this.props
    const { image } = this.state
    const department = category === "sp_phone" ? "electronics" : "furniture"
    const imageUrl = `${rootImageUrl}/${department}/${category}/${imageFolder}/`
    const backgroundImage = `url("${imageUrl + this.getImage()}")`

    return (
      <Block>
        <Controls>
          <Input
            placeholder="Добавить картинку"
            value={image}
            onChange={this.change}
            onKeyPress={this.add}
          />
          {image && <ImagePreview style={{ backgroundImage }} />}
        </Controls>
        <Content>
          {images.map((image, i) => (
            <Image
              key={i}
              imageUrl={imageUrl + image}
              image={image}
              remove={this.remove}
              swap={this.swap}
            />
          ))}
        </Content>
      </Block>
    )
  }

  getImage() {
    const { image } = this.state
    if (!image) return ""

    const [name, ext] = image.split(".")

    return !/^(png|jpeg|jpg)$/i.test(ext) ? name + ".jpg" : image
  }

  add = e => {
    if (e.key !== "Enter") return

    const { image } = this.state
    if (image) {
      const [name, ext] = image.split(".")

      const value = !/^(png|jpeg|jpg)$/i.test(ext) ? name + ".jpg" : image

      if (!this.props.images.find(image => image === value)) {
        this.setState(state => ({ image: "" }))
        this.props.actions.add(value)
      }
    }
  }

  change = e => {
    const { value } = e.currentTarget
    this.setState(state => ({ image: value }))
  }

  swap = e => {
    const { image, direction } = e.currentTarget.dataset
    const { images, actions } = this.props
    const index = images.indexOf(image)

    if (!image) return

    let from, to

    if (direction === "left") {
      from = index - 1
      to = index
    } else {
      from = index
      to = index + 1
    }

    // out of the range
    if (from < 0 || to > images.length - 1) return

    actions.swap(from, to)
  }

  remove = e => {
    const { image } = e.currentTarget.dataset
    if (image) this.props.actions.remove(image)
  }
}

const Block = styled.div`
  display: flex;
`

const Controls = styled.div`
  flex: 0 0 250px;
  margin-right: 20px;
  & input {
    width: 100%;
  }
`

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 5px;
  border: 1px solid #ccc;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`

const Content = styled.div`
  flex-wrap: wrap;
  display: flex;
`
