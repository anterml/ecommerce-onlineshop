import React, { Component } from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"

export default class Slider extends Component {
  state = {
    page: 0,
  }

  static getDerivedStateFromProps({ keyValue, count }, prevState) {
    if (keyValue !== prevState.keyValue) {
      return {
        page: 0,
        pages: Math.ceil((count - 1) / 3),
        keyValue,
      }
    }

    return null
  }

  render() {
    const { children, lineCount, count, clickOnItem } = this.props
    const { page, pages } = this.state

    return (
      <Block onClick={this.change}>
        {count > lineCount && (
          <Arrow
            left
            active={page > 0}
            onClick={this.left}
          >
            <Icon name="arrow" />
          </Arrow>
        )}
        <Content>
          <Wrap
            translateX={page * 104 * 3}
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
    if (this.state.page > 0) this.setState(state => ({ page: state.page - 1 }))
  }

  right = e => {
    const pages = Math.ceil((this.props.count - 1) / 3)
    const page = this.state.page + 1
    if (page < pages) this.setState(state => ({ page }))
  }
}

const Block = styled.div`
  display: flex;
  align-items: center;
`

const Arrow = styled.span`
  display: none;
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

  @media (max-width: 768px) {
    display: none;
  }
`

const Content = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`

const Wrap = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.translateX}px);
`
