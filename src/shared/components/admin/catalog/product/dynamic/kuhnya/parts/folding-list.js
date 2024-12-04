import React, { Component } from "react"
import styled from "styled-components"

export default class ShowingList extends Component {
  state = {
    show: false,
  }

  render() {
    const { values, index } = this.props
    const { show } = this.state
    const selectedItem = values[index]
    const longestName = this.getLongestItem()

    return (
      <Block onMouseLeave={this.show}>
        {selectedItem && (
          <SelectedItem onClick={this.toggleShow}>
            <Name>
              {selectedItem.kind} {selectedItem.name}
            </Name>
            <Code>{selectedItem.code}</Code>
          </SelectedItem>
        )}
        <LongestItem>
          <Name>
            {longestName.kind} {longestName.name}
          </Name>
          <Code>{longestName.code}</Code>
        </LongestItem>

        {show && (
          <List onClick={this.select}>
            {values.map(({ name, code, kind }, i) => (
              <Item
                key={code}
                data-i={i}
                data-selected={i === index}
              >
                <Name>
                  {kind} {name}
                </Name>
                <Code>{code}</Code>
              </Item>
            ))}
          </List>
        )}
      </Block>
    )
  }

  getLongestItem = e => {
    let index = 0
    let maxLen = 0

    this.props.values.forEach(({ name, code, kind }, i) => {
      const curr = kind + name + code
      if (curr.length > maxLen) {
        index = i
        maxLen = curr.length
      }
    })

    return this.props.values[index]
  }

  show = e => {
    this.setState({ show: false })
  }

  select = e => {
    const index = parseInt(e.target.dataset.i)
    if (typeof index === "number" && !Number.isNaN(index)) {
      this.props.select(index)
      this.setState({ show: false })
    }
  }

  toggleShow = e => {
    this.setState(state => ({ show: !state.show }))
  }
}

const Block = styled.div`
  position: relative;
  border: 1px solid #999;
  border-radius: 2px;
  display: inline-block;
`

const List = styled.div`
  position: absolute;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0 0 2px 1px #333;
  left: 0;
  right: 0;
`

const LongestItem = styled.div`
  height: 0;
  overflow: hidden;
  padding: 0 14px;
`

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 6px 14px;

  & * {
    pointer-events: none;
  }

  &:hover {
    background-color: #ddd;
  }

  &[data-selected="true"],
  &[data-selected="true"]:hover {
    background-color: #333;
    color: white;
  }
`

const SelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
`

const Name = styled.span`
  margin-right: 20px;
`

const Code = styled.span``
