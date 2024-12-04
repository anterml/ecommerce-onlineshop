import React from "react"
import styled from "styled-components"

const FieldNames = ({ fields, selectedField, select, remove }) => (
  <Block>
    {fields.map(({ price, value, _id }) => (
      <Field
        selected={selectedField._id === _id}
        key={_id}
      >
        <RemoveButton
          onClick={remove}
          data-id={_id}
        >
          x
        </RemoveButton>
        <Wrap
          onClick={select}
          data-id={_id}
        >
          <Value empty={!value}>{value || "Укажите значение"}</Value>
          {!!price && <Price>{price} руб</Price>}
        </Wrap>
      </Field>
    ))}
  </Block>
)

export default FieldNames

const Block = styled.div`
  width: 100%;
  user-select: none;
`

const Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  cursor: pointer;
  ${props =>
    props.selected &&
    `
    background-color: #ddd;
  `};

  &:hover {
    border-color: #ccc;
  }
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 6px;
  cursor: pointer;
`
const RemoveButton = styled.span`
  transform: scaleY(0.85);
  display: inline-block;
  padding: 3px 6px;
  color: #999;
  border-radius: 2px;

  &:hover {
    background-color: black;
  }
`

const Value = styled.span`
  ${props => props.empty && "color: firebrick"};
`

const Price = styled.div`
  color: #888;
  margin-right: 4px;
  white-space: nowrap;
`
