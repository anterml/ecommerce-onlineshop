import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

const IMAGE_URL = "shop/stuff/pages/main/sliders/"
const elemId = "main-page-image-slider-block"

const IMAGES = [
  { eng: "classic-mebel", ru: "Классическая мебель" },
  { eng: "krovati-vigodnie-ceni", ru: "Кровати по выгодным ценам" },
  { eng: "spalnya-siena", ru: "Спальня сиена" },
  {
    eng: "lovi-moment",
    ru: "Кресло в подарок при покупке компьютерного стола",
  },
  { eng: "free-delivery", ru: "Бесплатная доставка" },
]

class Slider extends Component {
  state = {
    index: 0,
    offset: 0,
  }

  componentDidMount() {
    const elem = document.getElementById(elemId)
    if (elem) {
      this.interval = setInterval(
        () =>
          this.setState(state => ({
            index: (state.index + 1) % IMAGES.length,
            offset: elem.offsetWidth,
          })),
        4000,
      )

      this.windowResize = () => {
        this.setState({ offset: elem.offsetWidth })
      }

      window.addEventListener("resize", this.windowResize)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    window.removeEventListener("resize", this.windowResize)
  }

  render() {
    const { index, offset } = this.state

    return (
      <Block
        data-gap={!this.props.isAdmin}
        id={elemId}
      >
        <Wrap style={{ transform: `translateX(-${index * offset}px)` }}>
          {IMAGES.map(({ eng, ru }, i) => (
            <picture key={i}>
              <source
                type="image/webp"
                srcSet={IMAGE_URL + "desktop/" + eng + ".webp"}
                media="(min-width: 768px)"
              />
              <source
                type="image/jpeg"
                srcSet={IMAGE_URL + "desktop/" + eng + ".jpg"}
                media="(min-width: 768px)"
              />

              <img
                src={IMAGE_URL + "desktop/" + eng + ".jpg"}
                alt={ru}
                data-active={i === index}
              />
            </picture>
          ))}
        </Wrap>
      </Block>
    )
  }
}

export default connect(state => ({ isAdmin: state.auth.admin }))(Slider)

const Block = styled.div`
  background-color: #ddd;
  position: relative;
  overflow: hidden;

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    margin-bottom: 50px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    &[data-gap="true"] {
      margin-top: 50px;
    }
  }

  @media (min-width: 1360px) {
    height: 450px;
  }

  & picture {
    display: block;
    min-width: 100%;
    box-sizing: border-box;
  }

  & img {
    width: 100%;
    opacity: 0;
    vertical-align: middle;
    transition: opacity 1.5s ease;

    &[data-active="true"] {
      opacity: 1;
    }
  }
`

const Wrap = styled.div`
  display: flex;
`
