import React, { Component } from "react"
import styled from "styled-components"

export default class Editing extends Component {
  state = {
    initValue: "",
    value: "",
  }

  static getDerivedStateFromProps({ value }, prevState) {
    if (value !== prevState.initValue) {
      return {
        initValue: value,
        value,
      }
    }

    return null
  }

  render() {
    const { value } = this.state
    return (
      <Block>
        <input
          value={value}
          onChange={this.edit}
        />
        <Controls>
          <button onClick={this.props.cancel}>Отмена</button>
          <button onClick={this.apply}>Применить</button>
        </Controls>
      </Block>
    )
  }

  edit = e => {
    this.setState({ value: e.target.value })
  }

  apply = () => {
    this.props.apply(this.state.value)
  }
}

const Block = styled.div`
  justify-content: space-between;
  padding: 15px;
  flex: 0 0 auto;
  background: #ddd;

  & input {
    display: block;
    padding: 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
  & button {
    padding: 6px 8px;
    flex: 1 1 auto;
  }
`

const Controls = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin-top: 10px;
  *:first-child {
    margin-right: 5px;
  }
`
