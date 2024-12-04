import React, { PureComponent } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

import IconArrow from "./icon"
const imagePath = "shop/category/"
const ITEM_WIDTH = 200
const ITEM_MARGIN_RIGHT = 16
const DEFAULT_COUNT_IN_ROW = 6

export default class Block extends PureComponent {
  state = {
    pos: 0,
    countInRow: DEFAULT_COUNT_IN_ROW,
  }

  componentDidMount() {
    const countInRow = getItemCountInRow(this.props.name)
    if (countInRow !== this.state.countInRow)
      this.setState(() => ({ countInRow }))
  }

  componentDidUpdate(prevProps) {
    const { componentUpdate } = this.props
    if (typeof componentUpdate === "funсtion") {
      componentUpdate(this.props, prevProps)
    }
  }

  render() {
    const { name, values, totalCount } = this.props
    const { pos, countInRow } = this.state

    return (
      <Container>
        <Header>
          <Title>{name}</Title>
          <IconArrow
            changeDirection={this.changeDirection}
            leftActive={pos > 0}
            rightActive={pos + countInRow < totalCount}
          />
        </Header>
        <List>
          <Items
            translateX={pos * -(ITEM_WIDTH + ITEM_MARGIN_RIGHT)}
            data-name={name}
          >
            {values.map(({ _id, category, base }) => {
              const { imageFolder, kind, name, urlName } = base
              const department =
                category === "sp_phone" ? "electronics" : "furniture"
              const linkPath = category === "sp_phone" ? "electronics" : "mebel"

              const productUrl = `/${linkPath}/${category}/${urlName}`
              const imageUrl = `${
                imagePath + department
              }/${category}/${imageFolder}/ct/1.jpg`

              return (
                <ItemLink
                  to={productUrl}
                  key={_id}
                  itemScope
                  itemType="http://schema.org/Product"
                >
                  <Image>
                    <img
                      src={imageUrl}
                      itemProp="image"
                      alt={kind + " " + name}
                    />
                  </Image>

                  <Name>{name}</Name>
                  <Kind>{kind}</Kind>
                </ItemLink>
              )
            })}
          </Items>
        </List>
      </Container>
    )
  }

  changeDirection = e => {
    const { direction } = e.target.dataset
    const { pos } = this.state
    const { name, totalCount, upload } = this.props
    const countInRow = getItemCountInRow(name)

    if (direction === "left" && pos > 0) {
      this.setState(state => {
        const pos = state.pos - countInRow
        return { pos: pos >= 0 ? pos : 0, countInRow }
      })
    } else if (direction === "right" && pos + countInRow <= totalCount) {
      this.setState(state => {
        const rest = totalCount - (state.pos + countInRow)
        if (rest > 0) {
          const pos = state.pos + (rest >= countInRow ? countInRow : rest)
          return { pos, countInRow }
        }
      })

      if (typeof upload === "function") upload(name)
    }
  }
}

function getItemCountInRow(name) {
  const elem = document.querySelector(`[data-name="${name}"]`)
  const maxWidth = elem.clientWidth + ITEM_MARGIN_RIGHT
  const elemWidth = ITEM_WIDTH + ITEM_MARGIN_RIGHT
  return elem ? Math.floor(maxWidth / elemWidth) : 6
}

const Container = styled.div`
  margin-bottom: 50px;
  position: relative;
  /* чтобы при клике на стрелочки слайдера не выделялись html блоки */
  user-select: none;
  height: 331px;

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
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
  margin: 0 0 20px;

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

  @media (min-width: 1px) {
    flex: 0 0 ${ITEM_WIDTH}px;
  }

  & * {
    pointer-events: none;
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
