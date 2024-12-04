import React, { PureComponent } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

export default class Button extends PureComponent {
  render() {
    return (
      <ButtonLink
        to="/department/mebel"
        onClick={this.click}
      >
        <HamburgerBar>
          <HamburgerItem />
          <HamburgerItem />
          <HamburgerItem />
        </HamburgerBar>
        <Text>Каталог товаров</Text>
      </ButtonLink>
    )
  }

  click = e => {
    // т.к для планшетов выпадающий спискок категорий
    // не показывается при наведении, а только по клику -
    // запрещаем переходить на общую страницу категории по клику
    if (window.outerWidth < 1024) {
      e.preventDefault()
    }
  }
}

const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #b30202;
  white-space: nowrap;

  @media (max-width: 1023px) {
    border-radius: 3px;
  }
`

const HamburgerBar = styled.div`
  width: 18px;
  @media (min-width: 1024px) {
    margin-right: 10px;
  }
`

const HamburgerItem = styled.div`
  height: 2px;
  margin-bottom: 3px;
  background-color: rgba(255, 255, 255, 0.85);
  &:last-child {
    margin: 0;
  }
`

const Text = styled.span`
  display: inline-block;
  font-size: 18px;
  color: white;

  @media (min-width: 768px) and (max-width: 1023px) {
    display: none;
  }
`
