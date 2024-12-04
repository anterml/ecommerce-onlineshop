import React from "react"
import styled from "styled-components"

const Item = ({ name, value, text, remove }) => (
  <Value
    onClick={remove}
    data-name={name}
    data-value={value}
  >
    <RemoveButton>x</RemoveButton>
    {text}
  </Value>
)

export default Item

const RemoveButton = styled.span`
  color: #999;
  margin-right: 5px;
  font-size: 15px;
  display: inline-block;
  transform: scaleY(0.75);
`

const Value = styled.span`
  display: inline-block;
  margin: 0 10px 7px 0;
  padding: 3px 10px;
  border-radius: 2px;
  border: 1px solid #bbb;
  cursor: pointer;
  font-size: 12px;
  color: #777;

  &:hover {
    border-color: #666;
  }

  &:hover ${RemoveButton} {
    color: #b30202;
  }
`
