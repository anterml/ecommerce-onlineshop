import React, { Component } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import { Button } from "globalComponents/admin/buttons"
export default class Creating extends Component {
  state = {
    value: "",
  }

  render() {
    const { cancel, maxIndex } = this.props
    return (
      <Block>
        <Index>{maxIndex}</Index>
        <Input
          value={this.state.value}
          onChange={this.change}
          onBlur={this.normalize}
        />
        <Button onClick={this.create}>Создать</Button>
        <Button onClick={cancel}>Отмена</Button>
      </Block>
    )
  }

  change = e => {
    const { value } = e.target
    this.setState(_ => ({ value }))
  }

  normalize = e => {
    const value = e.target.value.trim()
    this.setState(_ => ({ value }))
  }

  create = _ => {
    const { value } = this.state
    if (value) this.props.create(value)
  }
}

const Block = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 10px;
  }
`

const Index = styled.span`
  width: 40px;
`
