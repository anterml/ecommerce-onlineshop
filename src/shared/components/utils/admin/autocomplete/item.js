import React from "react"
import styled from "styled-components"

const Item = ({ value, startWord, endWord, hlWord, selected }) => (
  <Value
    data-value={value}
    selected={selected}
  >
    {startWord}
    <strong>{hlWord}</strong>
    {endWord}
  </Value>
)

export default Item

const Value = styled.div`
  padding: 1px 10px;
  cursor: pointer;
  white-space: nowrap;
  color: #555;

  strong {
    color: #00aafd;
    pointer-events: none;
  }

  ${props =>
    props.selected &&
    `
    background-color: #B2BFC8;
  `}
`
