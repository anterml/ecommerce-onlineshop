import React from "react"
import styled from "styled-components"

const LoadMoreButton = ({ load }) => (
  <Block
    onClick={load}
    id="more-products-btn"
  >
    Показать ещё
  </Block>
)

export default LoadMoreButton

const Block = styled.button`
  width: 100%;
  padding: 13px 15px;
  margin-bottom: 100px;
  font-weight: 400;
  font-size: 15px;
  background-color: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  color: #555;
  text-transform: uppercase;

  @media (min-width: 768px) {
    width: 390px;
  }

  &:hover {
    color: #333;
    border-color: #555;
  }
`
