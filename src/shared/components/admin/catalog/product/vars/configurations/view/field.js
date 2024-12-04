import React from "react"
import styled from "styled-components"
const statusList = ["", "#be0000", "#bbb", "#333"]

const Field = ({ value, price, status }) => (
  <div>
    <Status status={status} />
    <Content status={status}>
      <Value>{value}</Value>
      <Price>{price ? `${price} руб` : ""}</Price>
    </Content>
  </div>
)

export default Field

const Status = styled.span`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  background-color: ${props => statusList[props.status] || "transparent"};
`

const Content = styled.span`
  color: #333;
  ${props =>
    (props.status === 2 || props.status === 4) &&
    `
    opacity: 0.5;
  `}
`

const Value = styled.span`
  margin-right: 5px;
  color: #333;
`

const Price = styled.span`
  color: green;
  white-space: nowrap;
`
