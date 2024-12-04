import React from "react"
import styled from "styled-components"

const List = ({ configurations, select, create, selected }) => (
  <Block>
    <Item onClick={create}>+</Item>
    {configurations.map((c, i) => (
      <Item
        selected={c === selected}
        onClick={select}
        data-id={c._id}
        key={c._id}
      >
        {i + 1}
      </Item>
    ))}
  </Block>
)

export default List

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
`

const Item = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 15px;
  text-align: center;
  user-select: none;

  ${props =>
    props.selected
      ? `
      background-color: #419fe7;
      color: white;
      cursor: default;
    `
      : `
      background-color: #ddd;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    `}
`

const RemoveButton = styled.span`
  transform: scaleY(0.85);
  display: inline-block;
  padding: 3px 6px;
  margin-right: 7px;
  color: #999;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`
