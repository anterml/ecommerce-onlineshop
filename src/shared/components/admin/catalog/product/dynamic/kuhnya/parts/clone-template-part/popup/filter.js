import React from "react"
import styled from "styled-components"

const values = {
  all: "Все",
  included: "Выбранные",
  inset: "В комплекте",
  nonset: "Не в комплекте",
}

const Filter = ({ select, selected, parts }) => (
  <Block>
    {Object.keys(values).map(name => (
      <div
        data-filter={name}
        data-selected={selected === name}
        onClick={select}
        key={name}
      >
        {values[name]} {parts[name].length}
      </div>
    ))}
  </Block>
)

export default Filter

const Block = styled.div`
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  & > * {
    color: #007dd0;
    margin-right: 10px;
    text-decoration: underline;
    cursor: pointer;

    &[data-selected="true"] {
      color: #999;
    }
  }
`
