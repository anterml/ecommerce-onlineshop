import React, { Component } from "react"
import styled from "styled-components"
import { getBaseProperties, getResultProperties } from "utils/data/parts"

export default class Properties extends Component {
  render() {
    const { part, productGroups } = this.props
    const properties = getResultProperties(part)
    const baseProperties = getBaseProperties(part.kind)
    const groupNames = productGroups.map(g => g.name)

    return (
      <Block>
        {groupNames.map(name => (
          <Item key={name}>
            <input
              type="checkbox"
              name={name}
              onChange={this.change}
              checked={properties.includes(name)}
            />
            <Name
              data-status={this.getStatus(properties, baseProperties, name)}
            >
              {name}
            </Name>
          </Item>
        ))}
        {!groupNames.length && (
          <WarningText>
            В вариациях у кухни не создано ни одной группы
          </WarningText>
        )}
      </Block>
    )
  }

  getStatus = (result, base, name) => {
    return result.includes(name) !== base.includes(name)
  }

  change = e => {
    let { name } = e.target
    if (name) {
      const { part, actions } = this.props

      if (getBaseProperties(part.kind).includes(name)) name = "-" + name

      const newPart = {
        ...part,
        properties: part.properties.includes(name)
          ? part.properties.filter(value => value !== name)
          : [...part.properties, name],
      }
      actions.change(part, newPart)
    }
  }
}

const Block = styled.div`
  input[type="checkbox"] {
    margin: 0 5px 0 0;
  }
`

const Item = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 10px;
`

const Name = styled.span`
  &[data-status="true"] {
    color: green;
  }
`

const WarningText = styled.span`
  color: #b47015;
  font-weight: 500;
`
