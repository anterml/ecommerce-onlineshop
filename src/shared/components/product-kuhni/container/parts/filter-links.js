import React from "react"
import styled from "styled-components"

const values = {
  all: "Все",
  top: "Верхние",
  bottom: "Нижние",
}

const FilterLinks = ({ name, value, change }) => (
  <Block
    onClick={change}
    data-name={name}
  >
    Просмотр:
    {Object.keys(values).map(name => (
      <span
        data-value={name}
        data-active={name === value}
        key={name}
      >
        {values[name]}
      </span>
    ))}
  </Block>
)

export default FilterLinks

const Block = styled.div`
  @media (min-width: 768px) {
    margin-left: 30px;
  }

  span {
    margin-left: 10px;
    color: #b30202;

    &[data-active="false"] {
      color: #0670eb;
      cursor: pointer;

      &:hover {
        color: #0f56a9;
      }
    }
  }
`
