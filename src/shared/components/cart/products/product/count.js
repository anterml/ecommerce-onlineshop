import React from "react"
import styled from "styled-components"

const Count = ({ value, inc, dec }) => (
  <Block>
    <Button onClick={dec}>&minus;</Button>
    <Value>{value}</Value>
    <Button onClick={inc}>+</Button>
  </Block>
)

export default Count

const Block = styled.div`
  margin-bottom: 20px;
  @media (min-width: 500px) {
    margin: 0 40px;
  }
`

const Button = styled.span`
  color: #aaa;
  font-size: 21px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #0670eb;
  }
`

const Value = styled.span`
  margin: 0 25px;
`
