import React from "react"
import styled from "styled-components"

const List = ({ values, select, selectedId }) => (
  <Block onClick={select}>
    {values.map(({ _id, name }) => (
      <Item
        data-id={_id}
        key={_id}
        data-selected={_id === selectedId}
      >
        <span>{name}</span>
      </Item>
    ))}
  </Block>
)

export default List

const Block = styled.div`
  padding-bottom: 100px;
  overflow-y: scroll;
  flex: 0 0 450px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &[data-selected="true"] {
    background-color: #ccc;
  }

  span {
    pointer-events: none;

    &:first-child {
      font-weight: 500;
    }
  }
`
