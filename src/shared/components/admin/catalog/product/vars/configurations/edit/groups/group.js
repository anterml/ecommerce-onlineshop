import React from "react"
import styled from "styled-components"

const Group = ({ skip, name, id, toggle }) => (
  <Title
    onClick={toggle}
    data-id={id}
    data-skip={skip}
  >
    <Status hide={skip} />
    {name}
  </Title>
)

export default Group

const Title = styled.div`
  color: ${props => (props.skip ? "#999" : "#292929")};
  margin-bottom: 2px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
`

const Status = styled.span`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  background-color: ${props => (props.hide ? "#bbb" : "transparent")};
`
