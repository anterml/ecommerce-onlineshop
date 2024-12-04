import React, { Component } from "react"
import { Input, Title, Item } from "globalComponents/admin/elements"
import styled from "styled-components"

const fields = {
  sortPriority: "Приоритет (сортировка)",
}

export default class Settings extends Component {
  render() {
    const { settings } = this.props
    return Object.keys(fields).map(name => (
      <Item key={name}>
        <Title>{fields[name]}</Title>
        <Wrap>
          <Input
            value={settings[name]}
            name={name}
            onChange={this.change}
          />
        </Wrap>
      </Item>
    ))
  }

  change = e => {
    let { name, value } = e.target
    if (name === "sortPriority") value = Number(value) || ""
    this.props.actions.change(name, value)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.settings !== this.props.settings
  }
}

const Wrap = styled.div`
  width: 300px;
  display: flex;
`
