import React from "react"
import styled from "styled-components"

const Group = ({ group, selected, groupNames, select }) => {
  const { _id, name, fields } = group

  return (
    <Item
      onClick={select}
      data-selected={selected}
      data-id={_id}
    >
      <Name>{name}</Name>
      <Count>{fields.length}</Count>
    </Item>
  )
}

export default Group

const Item = styled.div`
  padding: 6px;
  user-select: none;
  margin-right: 5px;
  color: #007dd0;

  &[data-selected="false"] {
    cursor: pointer;
  }

  &[data-selected="true"] {
    color: #888;
  }
`

const Name = styled.span`
  margin-right: 4px;
  pointer-events: none;
`

const Count = styled.span`
  color: #999;
  font-weight: 300;
  pointer-events: none;
`
