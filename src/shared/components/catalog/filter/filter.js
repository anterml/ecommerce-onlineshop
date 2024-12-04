import React from "react"
import styled from "styled-components"
import List from "./list/list"

const Filter = props => (
  <Block id="catalog-filter">
    <Title>Фильтр</Title>
    <List {...props} />
  </Block>
)

export default Filter

const Block = styled.div`
  width: 100%;
  padding-bottom: 40px;
  border-radius: 3px;
  position: relative;
  @media (max-width: 1023px) {
    display: none;
    position: absolute;
    border: 3px solid blue;
    background: #fff;
    z-index: 10;
  }
`

const Title = styled.div`
  padding-bottom: 15px;
  font-weight: 300;
  color: #969696;
  text-transform: uppercase;
  border-bottom: 1px solid #e1e1e1;
`
