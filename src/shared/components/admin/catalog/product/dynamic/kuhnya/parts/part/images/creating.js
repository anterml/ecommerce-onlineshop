import React, { Component, Fragment } from "react"
import styled from "styled-components"
import imageAutoExt from "utils/image-auto-ext"

export default class Creating extends Component {
  state = {
    image: "",
    edit: false,
  }

  render() {
    const { imagePath } = this.props
    let { edit } = this.state
    const image = imageAutoExt(this.state.image)

    return (
      <Block>
        {!edit ? (
          <AddButton onClick={this.edit}>+</AddButton>
        ) : (
          <Fragment>
            <input
              placeholder="Добавить картинку"
              onKeyUp={this.handle}
            />
            <Image
              style={{ backgroundImage: `url("${imagePath}/${image}")` }}
            />
            <CancelButton onClick={this.cancel}>Отмена</CancelButton>
          </Fragment>
        )}
      </Block>
    )
  }

  cancel = e => {
    this.setState({ edit: false, image: "" })
  }

  edit = e => {
    this.setState({ edit: true })
  }

  handle = e => {
    let { image } = this.state
    if (e.key === "Enter" && image.trim()) {
      image = imageAutoExt(image)
      this.setState({ edit: false })

      const { part, actions } = this.props

      if (part.images.includes(image)) return

      const newPart = {
        ...part,
        images: [...part.images, image],
      }

      return actions.change(part, newPart)
    }

    this.setState({ image: e.target.value })
  }
}

const CancelButton = styled.div`
  padding: 8px 0;
  text-align: center;
  color: #007dd0;
  cursor: pointer;
`

const AddButton = styled.div`
  font-size: 60px;
  color: #aaa;
  user-select: none;
  cursor: pointer;
`

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  input {
    padding: 8px 12px;
    text-align: center;
    width: 100%;
  }
`

const Image = styled.div`
  position: relative;
  width: 200px;
  flex: 1 1 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`
