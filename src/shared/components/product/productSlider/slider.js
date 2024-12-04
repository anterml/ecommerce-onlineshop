import React, { Component } from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"

export default class Slider extends Component {
  state = {
    page: 1,
  }

  static getDerivedStateFromProps({ keyValue, count, category }, prevState) {
    if (keyValue !== prevState.keyValue) {
      return {
        category,
        page: 1,
        keyValue,
      }
    }

    return null
  }

  render() {
    const { children, lineCount, count, pages, clickOnItem } = this.props
    const { page } = this.state

    return (
      <Block onClick={this.change}>
        {count > lineCount && (
          <Arrow
            left
            active={page > 1}
            onClick={this.left}
          >
            <Icon name="arrow" />
          </Arrow>
        )}
        <Content>
          <Wrap
            translateX={(page - 1) * 135 * lineCount}
            onClick={clickOnItem}
          >
            {children}
          </Wrap>
        </Content>
        {count > lineCount && (
          <Arrow
            active={page < pages}
            onClick={this.right}
          >
            <Icon name="arrow" />
          </Arrow>
        )}
      </Block>
    )
  }

  left = e => {
    if (this.state.page > 1) this.setState(state => ({ page: state.page - 1 }))
  }

  right = e => {
    const { pages } = this.props

    const page = this.state.page + 1
    if (page <= pages) {
      if (page === pages) {
        this.props.handleRight(page)
      }

      this.setState(state => ({ page }))
    }
  }
}

const Block = styled.div`
  display: flex;
  align-items: center;
  overflow-x: hidden;
  user-select: none;
  flex: 1 1 auto;
`

const Arrow = styled.span`
  height: 32px;
  flex: 0 0 32px;
  padding: 5px;
  transform: rotate(${props => (props.left ? 90 : -90)}deg);
  ${props =>
    props.active
      ? `
      opacity: 0.7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    `
      : "opacity: 0.2"};
`

const Content = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
`

const Wrap = styled.div`
  display: flex;
  transition: transform 1s ease;
  transform: translateX(-${props => props.translateX}px);
`
