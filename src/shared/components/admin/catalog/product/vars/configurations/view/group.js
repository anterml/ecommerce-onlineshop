import React from "react"
import styled from "styled-components"
const statusList = ["", "#be0000", "#bbb", "#333"]

const Group = ({ name, status }) => (
  <Title>
    <Status status={status} />
    {name}
  </Title>
)

export default Group

const Title = styled.div`
  color: ${props => (props.skip ? "#999" : "#292929")};
  margin-bottom: 2px;
  font-weight: 500;
`

const Status = styled.span`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  background-color: ${props => statusList[props.status] || "transparent"};
`
