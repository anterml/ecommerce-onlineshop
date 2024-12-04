import React from "react"
import styled from "styled-components"
import SearchControl from "../search/search"

const Search = ({}) => (
  <Block>
    <SearchControl />
  </Block>
)

export default Search

const Block = styled.div`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 767px) {
    margin: 10px 0;
    padding: 0 15px;
  }
`
