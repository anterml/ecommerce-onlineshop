import React, { PureComponent } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

import IconArrow from "./icon"
const imagePath = "shop/category/"
const ITEM_WIDTH = 200 //192
const ITEM_MARGIN_RIGHT = 16

export default class Slider extends PureComponent {
  state = {
    pos: 0,
    countInRow: 7,
  }

  render() {
    const { name, value, viewport, elemId } = this.props
    const { pos } = this.state

    const products = value.map(({ _id, category, base }) => {
      const { imageFolder, kind, name, urlName } = base
      const department = category === "sp_phone" ? "electronics" : "furniture"
      const linkPath = category === "sp_phone" ? "electronics" : "mebel"

      const productUrl = `/${linkPath}/${category}/${urlName}`
      const imageUrl = `${
        imagePath + department
      }/${category}/${imageFolder}/ct/1.jpg`

      return (
        <ItemLink
          to={productUrl}
          key={_id}
        >
          <Image>
            {viewport && (
              <img
                src={imageUrl}
                alt={kind + " " + name}
              />
            )}
          </Image>

          <Name>{name}</Name>
          <Kind>{kind}</Kind>
        </ItemLink>
      )
    })

    return (
      <Container id={elemId}>
        <Header>
          <Title>{name}</Title>
          <IconArrow changeDirection={this.changeDirection} />
        </Header>
        <List>
          <Items translateX={pos * -(ITEM_WIDTH + ITEM_MARGIN_RIGHT)}>
            {products}
          </Items>
        </List>
      </Container>
    )
  }

  changeDirection = e => {
    const { direction } = e.target.dataset
    const { pos, countInRow } = this.state
    const { name, count, upload } = this.props

    if (direction === "left" && pos > 0) {
      this.setState(state => ({ pos: state.pos - 1 }))
    } else if (direction === "right" && pos + countInRow <= count) {
      this.setState(state => ({ pos: state.pos + 1 }))
      upload(name)
    }
  }
}

const Container = styled.div`
  margin-bottom: 50px;
  position: relative;
  /* чтобы при клике на стрелочки слайдера не выделялись html блоки */
  user-select: none;
  height: 331px;

  @media (max-width: 767px) {
    display: none;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;

  & > span {
    color: #555;
    font-size: 13px;
    font-weight: 300;
    margin-left: 8px;
    &:hover {
      color: #333;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 767px) {
    text-align: center;
    margin: 20px 0 0;
  }
`

const List = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const Items = styled.div`
  display: flex;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.5s ease;
`

const Button = styled.button`
  font-size: 1em;
  background: #bb1313;
  border: 1px solid transparent;
  padding: 6px 23px;
  color: white;
  font-weight: 300;
  font-size: 15px;
  border-radius: 2px;
  visibility: hidden;
  cursor: pointer;

  @media (max-width: 767px) {
    display: none;
  }

  &:hover {
    background-color: #990e0e;
  }
`

const ItemLink = styled(Link)`
  margin-right: ${ITEM_MARGIN_RIGHT}px;
  overflow: hidden;

  @media (min-width: 768px) {
    flex: 0 0 ${ITEM_WIDTH}px;
  }

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &:hover ${Button} {
    visibility: visible;
  }
`

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;

  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`

const Name = styled.div`
  line-height: 16px;
  margin-top: 15px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Kind = styled.div`
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: 768px) {
    margin-bottom: 15px;
  }
`
