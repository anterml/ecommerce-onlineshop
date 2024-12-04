import React from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"

const Categories = ({ values, toggle, changePrice }) =>
  values.map(({ name, price, disabled, images }, i) => (
    <Block
      data-disabled={disabled}
      key={i}
    >
      <Label data-many={values.length > 1}>
        {values.length > 1 && (
          <input
            type="checkbox"
            checked={!disabled}
            onChange={toggle}
            data-i={i}
          />
        )}
        <div>
          <Name>{name || "Базовая"}</Name>
          <span>{price || 0} руб.</span>
          <Images>
            <span>{images.length} картинок</span>
          </Images>
        </div>
      </Label>
      <Input
        type="text"
        data-name="price"
        data-index={i}
        placeholder="Своя цена"
        onBlur={changePrice}
        disabled={disabled}
      />
    </Block>
  ))

export default Categories

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  &[data-disabled="true"] > * {
    opacity: 0.5;
  }

  & input[type="text"] {
    width: 85px;
    flex: 0 0 85px;
    margin-left: 20px;
  }

  & input[type="checkbox"] {
    margin: 0 10px 0 0;
  }
`

const Label = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  &[data-many="true"] {
    cursor: pointer;
  }
`

const Name = styled.span`
  margin-right: 5px;
`

const Images = styled.div`
  color: #777;
  & > *:first-child {
    margin-right: 5px;
  }
`
