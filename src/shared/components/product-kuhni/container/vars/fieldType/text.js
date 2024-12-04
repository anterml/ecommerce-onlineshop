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

export const TextFields = ({ fields, change, only, selectedId }) => (
  <Block>
    {fields.map(({ _id, name, value, price }) => (
      <Item
        onClick={change}
        data-id={_id}
        data-name={name}
        key={_id}
      >
        {!only && <Radio data-checked={selectedId === _id} />}
        <R data-checked={selectedId === _id}>
          <Value>{value}</Value>
          {price && <Price>+{price} &#8381;</Price>}
        </R>
      </Item>
    ))}
  </Block>
)

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 20px;
  margin-bottom: 10px;
  & > * {
    pointer-events: none;
  }
`

const R = styled.div`
  position: relative;
  &:before {
    content: "";
    display: block;
    border: 2px solid #ddd;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
  }
  &[data-checked="true"]:before {
    border-color: #be0001;
  }
  &[data-checked="true"]:after {
    background-color: #be0001;
  }
  &:after {
    content: "";
    display: block;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
    height: 10px;
    width: 10px;
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
  display: none;
  border-radius: 50%;
  margin-right: 7px;

  &[data-checked="true"] {
    background-color: #be0001;
  }
`

const Value = styled.span`
  display: inline-block;
  margin-left: 27px;
`

const Price = styled.span`
  margin-left: 5px;
  color: #568b29;
  white-space: nowrap;
`
