import React from "react"
import styled from "styled-components"

const MultiValues = ({ values, remove }) =>
  values.map(({ name, value }) => (
    <Item key={name + value}>
      <RemoveButton
        data-name={name}
        data-value={value}
        onClick={remove}
      >
        x
      </RemoveButton>
      <Value>{value}</Value>
    </Item>
  ))

export default MultiValues

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const RemoveButton = styled.span`
  transform: scaleY(0.85);
  display: inline-block;
  margin-right: 5px;
  padding: 3px 6px;
  color: #999;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`

const Value = styled.span``
