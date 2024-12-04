import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Catalog from "./catalog"
import Link from "react-router-dom/Link"

export default class Links extends Component {
  render() {
    return (
      <Block>
        <StyledLink to="/">Главная</StyledLink>
        <Catalog />
        <StyledLink to="/kontakty">Контакты</StyledLink>
        <StyledLink
          to="/cart"
          rel="nofollow noopener"
        >
          Корзина
        </StyledLink>
      </Block>
    )
  }
}

const Block = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  margin-bottom: 10px;
  display: none;
  background-color: #26a9ff;
  color: white;
  background-image: url(shop/textures/1.png);

  @media (max-width: 767px) {
    display: flex;
  }
`

const StyledLink = styled(Link)`
  cursor: pointer;
  color: white;
`
