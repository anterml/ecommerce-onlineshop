import React from "react"
import styled from "styled-components"

const Header = ({ count, title }) => (
  <Block>
    <CategoryName>{title}</CategoryName>
    <CategoryCount>{count} товаров</CategoryCount>
  </Block>
)

export default Header

const Block = styled.header`
  margin-bottom: 20px;
  font-weight: 300;
  color: #555;
`

const CategoryName = styled.h1`
  margin: 0 10px 0 0;
  display: inline-block;
  font-size: 15px;
  @media (min-width: 768px) {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const CategoryCount = styled.span`
  font-size: 13px;
  color: #999;
  display: none;
`
