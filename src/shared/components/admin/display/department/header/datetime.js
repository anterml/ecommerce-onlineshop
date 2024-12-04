import React from "react"
import styled from "styled-components"

const Datetime = ({ title, value }) => (
  <Block>
    <Title>{title}</Title>
    <Author>{value.author}</Author>
    <span>{value.date}</span>
  </Block>
)

export default Datetime

const Block = styled.div`
  white-space: nowrap;
  font-weight: 300;
`

const Title = styled.span`
  display: inline-block;
  min-width: 70px;
  color: #888;
`

const Author = styled.span`
  margin-right: 4px;
`
