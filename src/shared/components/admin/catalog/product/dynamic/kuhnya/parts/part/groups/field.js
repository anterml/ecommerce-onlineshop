import React from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"

export const Field = ({
  productField,
  partField,
  remove,
  changePrice,
  code,
}) => (
  <Item>
    <div>
      <RemoveButton
        onClick={remove}
        data-id={partField._id}
      >
        x
      </RemoveButton>
      <Value>
        {productField.name} {productField.value}{" "}
        {productField.price && <span>{productField.price} руб</span>}
      </Value>
    </div>
    <Price>
      <Input
        defaultValue={partField.price || ""}
        onBlur={changePrice}
        data-id={partField._id}
        key={code}
      />
      руб.
    </Price>
  </Item>
)

export const MissingField = ({ field, remove }) => (
  <Item>
    <div>
      <RemoveButton
        onClick={remove}
        data-id={field._id}
      >
        x
      </RemoveButton>
      <Warning>Это поле было удалено в вариациях</Warning>
    </div>
  </Item>
)

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  margin-bottom: 5px;
`

const RemoveButton = styled.span`
  transform: scaleY(0.85);
  display: inline-block;
  margin-right: 5px;
  padding: 3px 6px;
  color: #999;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`

const Value = styled.span`
  margin-right: 5px;
`

const Price = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  input {
    text-align: center;
    width: 70px;
    margin-right: 10px;
  }
`

const Warning = styled.span`
  color: #b47015;
  font-weight: 500;
`
