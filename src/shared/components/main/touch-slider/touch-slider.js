import React, { Component } from "react"
import styled from "styled-components"

const rgb = [
  "#069",
  "#b30202",
  "blue",
  "black",
  "pink",
  "green",
  "orange",
  "gray",
  "yellow",
  "#555",
]
const ITEM_WIDTH = 160

export default class TouchSlider extends Component {
  state = {
    values: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26,
    ],
  }

  componentDidMount() {
    this.element = document.getElementById("test-list")
    this.translateX = 0
    this.offset = 0
  }

  render() {
    const { values } = this.state
    const products = values.map((value, i) => {
      const text =
        i === 0 ? "Первый" : i === values.length - 1 ? "Последний" : ""
      return (
        <Item
          key={value}
          style={{ backgroundColor: rgb[value % rgb.length] }}
        >
          {text}
        </Item>
      )
    })
    return (
      <Block
        onPointerDown={this.handleStart}
        onPointerMove={this.handleMove}
        onPointerUp={this.handleEnd}
      >
        <List id="test-list">{products}</List>
      </Block>
    )
  }

  handleStart = e => {
    this.clicked = true
    this.startX = e.clientX
    clearInterval(this.interval)
    this.element.classList.remove("animate-translateX")
  }

  handleEnd = e => {
    this.clicked = false

    // не выравниваем если долистали до самого левого края,
    if (this.offset === 0) {
      this.translateX = 0
      return
    }

    // если листаем влево, тогда нужно выравнить влево, а это -1 айтем
    const diffCount = this.startX - e.clientX >= 0 ? 0 : -1

    // сколько пискселей нужно выравнить
    const adjustOffset =
      (Math.floor(this.offset / ITEM_WIDTH) - diffCount) * ITEM_WIDTH

    this.element.classList.add("animate-translateX")
    this.translateX = adjustOffset
    this.element.style.transform = `translateX(${adjustOffset}px)`
  }

  handleMove = e => {
    if (this.clicked) {
      this.offset = this.translateX + (this.startX - e.clientX) * -1
      const maxWidth =
        -ITEM_WIDTH * this.state.values.length + this.element.clientWidth

      // запретить выходить за левую границу
      if (this.offset > 0) this.offset = 0
      // запретить выходить за правую границу
      else if (this.offset < maxWidth) this.offset = maxWidth

      this.element.style.transform = `translateX(${this.offset}px)`
    }
  }
}

const Block = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  user-select: none;
`

const List = styled.div`
  display: flex;
  cursor: pointer;
  &.animate-translateX {
    transition: transform 0.5s ease;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${ITEM_WIDTH}px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  height: 300px;
  background: #ccc;
`
