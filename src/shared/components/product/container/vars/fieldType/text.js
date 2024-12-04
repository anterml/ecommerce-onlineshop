import React from "react"
import styled from "styled-components"

export const NoChoiceField = ({ id, name, value, change, selected }) => (
  <Item2
    onClick={change}
    data-id={id}
    data-name={name}
  >
    <Radio data-checked={selected} />
    <Value>{value}</Value>
  </Item2>
)

export const TextFields = ({ fields, change, only, selectedId }) =>
  fields.map(({ _id, name, value, price }) => (
    <Item
      onClick={change}
      data-id={_id}
      data-name={name}
      key={_id}
    >
      {!only && <Radio data-checked={selectedId === _id} />}
      <span>
        <Value>{value}</Value>
        {price && <Price>+{price} &#8381;</Price>}
      </span>
    </Item>
  ))

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  & > * {
    pointer-events: none;
  }
`

const Item2 = styled(Item)`
  margin-bottom: 5px;
`

const Radio = styled.span`
  background-color: #b7c6d0;
  flex: 0 0 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 7px;

  &[data-checked="true"] {
    background-color: #be0001;
  }
`

const Value = styled.span`
  display: inline-block;
  color: #333;
`

const Price = styled.span`
  margin-left: 5px;
  color: #568b29;
  white-space: nowrap;
`
