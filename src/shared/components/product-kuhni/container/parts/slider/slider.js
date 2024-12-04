import React, { PureComponent } from "react"
import styled from "styled-components"

import IconArrow from "./icon"
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
    if (this.props.filterName !== prevProps.filterName)
      this.setState(() => ({ pos: 0 }))
  }

  render() {
    const { name, children, totalCount, links } = this.props
    const { pos, countInRow } = this.state

    return (
      <Container>
        <Header>
          <Wrap>
            <Title>{name}</Title>
            {links}
          </Wrap>
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
            {children}
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

  if (!elem) return DEFAULT_COUNT_IN_ROW

  const maxWidth = elem.clientWidth + ITEM_MARGIN_RIGHT
  const elemWidth = ITEM_WIDTH + ITEM_MARGIN_RIGHT

  return elem ? Math.floor(maxWidth / elemWidth) : DEFAULT_COUNT_IN_ROW
}

const Container = styled.div`
  position: relative;
  /* чтобы при клике на стрелочки слайдера не выделялись html блоки */
  user-select: none;
  height: 431px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

const Wrap = styled.div`
  display: flex;
  line-height: 18px;
  @media (max-width: 767px) {
    flex-flow: column nowrap;
  }
`

const Title = styled.h2`
  font-weight: 300;
  margin: 0;
  font-size: 15px;
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

  & > * {
    margin-right: ${ITEM_MARGIN_RIGHT}px;
    overflow: hidden;

    @media (min-width: 1px) {
      flex: 0 0 ${ITEM_WIDTH}px;
    }
  }
`
