import React, { PureComponent } from "react"
import styled from "styled-components"

export default class Creating extends PureComponent {
  state = {
    value: "",
  }

  render() {
    const { value } = this.state
    const { create, change } = this
    const { placeholder } = this.props

    return (
      <Block>
        <input
          placeholder={placeholder}
          onChange={change}
          onKeyPress={create}
          value={value}
        />
        <button onClick={create}>Создать</button>
      </Block>
    )
  }

  change = e => {
    this.setState({ value: e.target.value })
  }

  create = e => {
    if (e.key && e.key !== "Enter") return

    const value = this.state.value.trim()
    const { add } = this.props
    if (value) {
      add(value)
      this.setState({ value: "" })
    }
  }
}

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
  flex: 0 0 auto;
  background: #ddd;

  & input {
    padding: 8px 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
  & button {
    margin-left: 5px;
  }
`
