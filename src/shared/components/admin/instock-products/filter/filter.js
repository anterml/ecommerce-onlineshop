import React from "react"
import styled from "styled-components"

const Filter = ({ change, placeNames, selected }) => (
  <Block onClick={change}>
    <Title>Показать:</Title>
    <span data-place="all">Все</span>
    {placeNames.map((name, i) => (
      <span
        data-place={i}
        key={i}
        data-selected={name === selected}
      >
        {name}
      </span>
    ))}
  </Block>
)

export default Filter

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  user-select: none;
  span {
    color: #ddd;
    &[data-selected="false"] {
      cursor: pointer;
      color: red;
    }
  }
`

const Title = styled.span`
  font-weight: 500;
  margin-right: 15px;
`
