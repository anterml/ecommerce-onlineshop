import React from "react"
import styled from "styled-components"

const Texts = ({ name, value, field, selectedAttrs, toggleAttr }) => (
  <div
    onClick={toggleAttr}
    data-name={name}
  >
    {value.map((v, k) => {
      const attrName = field ? field : name
      const isChecked = selectedAttrs.includes(attrName + "=" + v.name)

      return (
        <Item
          data-value={v.name}
          data-field={field}
          key={k}
        >
          <Radio data-checked={isChecked} />
          {v.name}
          <Count>{v.count}</Count>
        </Item>
      )
    })}
  </div>
)

export default Texts

const Radio = styled.span`
  position: relative;
  border: 1px solid #ddd;
  height: 16px;
  width: 16px;
  margin-right: 9px;

  &[data-checked="true"] {
    border-color: #be0001;
    &:after {
      background-color: #be0001;
    }
  }

  &:after {
    content: "";
    display: block;
    background-color: transparent;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
  }
`

const Item = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  span {
    pointer-events: none;
  }
`

const Count = styled.span`
  color: #999;
  margin-left: 4px;
`
