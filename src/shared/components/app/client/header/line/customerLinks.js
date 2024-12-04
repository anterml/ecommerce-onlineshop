import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import DropdownHOC from "./dropdown"

const Button = () => <ButtonText>Покупателям</ButtonText>

const List = () => (
  <Items>
    <StyledLink to="/dostavka-i-oplata">Доставка и оплата</StyledLink>
    <StyledLink to="/kak-oformit-zakaz">Как оформить заказ</StyledLink>
    <StyledLink to="/garantiya">Гарантия</StyledLink>
    <StyledLink to="/kontakty">Контакты</StyledLink>
    <StyledLink to="/rassrochka-i-credit">Рассрочка и кредит</StyledLink>
  </Items>
)

export default DropdownHOC(Button, List)

const ButtonText = styled.div`
  color: rgba(255, 255, 255, 0.87);
  padding: 15px 20px 15px 21px;
  font-size: 14px;
`

const Items = styled.div`
  position: absolute;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
  left: 0;
  z-index: 1000;
  background-color: white;
`

const StyledLink = styled(Link)`
  display: block;
  padding: 6px 15px;
  color: #444;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: #bddcf1;
    color: #4f4f4f;
  }
`
