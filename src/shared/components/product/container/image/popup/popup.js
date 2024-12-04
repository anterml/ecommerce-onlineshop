import React, { Component } from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"

export default class Popup extends Component {
  state = {
    pos: this.props.pos,
  }

  constructor(props) {
    super(props)
    this.scrollY = window.scrollY
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", this.handleArrowKeys)
  }

  render() {
    const { images, imagePath, close } = this.props
    const { pos } = this.state
    const only = images.length <= 1

    return (
      <Block>
        <CloseButton onClick={close}>
          <span>x</span>
        </CloseButton>
        <Arrow
          onClick={this.left}
          data-only={only}
        >
          <Icon name="arrow" />
        </Arrow>
        <Container onClick={this.right}>
          <List translateX={pos * -100}>
            {images.map((image, i) => (
              <Image key={i}>
                <img
                  src={imagePath + image}
                  data-action="go-to-right"
                />
              </Image>
            ))}
          </List>
          <PictureOverlay />
        </Container>
        <Arrow
          onClick={this.right}
          data-only={only}
        >
          <Icon name="arrow" />
        </Arrow>
      </Block>
    )
  }

  left = () => {
    this.changeImage("left")
  }

  right = () => {
    this.changeImage("right")
  }

  handleArrowKeys = e => {
    var e = e || window.event
    if (e.key === "ArrowLeft" || e.keyCode === "37") {
      return this.changeImage("left")
    }

    if (e.key === "ArrowRight" || e.keyCode === "39") {
      return this.changeImage("right")
    }

    if (e.key === "Escape" || e.keyCode === "27") {
      return this.props.close()
    }
  }

  changeImage = direction => {
    const { images } = this.props
    let pos =
      typeof this.state.pos === "number" ? this.state.pos : this.props.pos

    if (direction === "left") {
      pos -= 1

      if (pos < 0) pos = images.length - 1

      return this.setState({ pos })
    }

    if (direction === "right") {
      pos += 1

      if (pos > images.length - 1 || pos === -1) pos = 0

      return this.setState({ pos })
    }
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
  background-color: white;
  z-index: 1000;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  height: 100%;
`

const PictureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const List = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  transform: translateX(${props => props.translateX}%);
  transition: transform 0.5s ease;
`

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 100%;
  max-width: 100%;
  transition: opacity 0.5s ease;

  img {
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  border-radius: 3px;
  cursor: pointer;
  color: #ccc;

  &:hover {
    color: #bbb;
  }

  span {
    transform: scaleY(0.8);
    font-size: 50px;
    display: inline-block;
    @media (min-width: 768px) {
      font-size: 70px;
    }
  }
`

const Arrow = styled.span`
  flex: 0 0 30px;
  height: 30px;
  padding: 5px;
  opacity: 0.7;
  cursor: pointer;

  &[data-only="true"] {
    visibility: hidden;
  }

  @media (min-width: 768px) {
    flex: 0 0 52px;
    height: 52px;
  }

  &:nth-of-type(1) {
    margin: 0 12px 0 25px;
    transform: rotate(90deg);
  }

  &:nth-of-type(2) {
    margin: 0 25px 0 12px;
    transform: rotate(-90deg);
  }

  &:hover {
    opacity: 1;
  }
`
