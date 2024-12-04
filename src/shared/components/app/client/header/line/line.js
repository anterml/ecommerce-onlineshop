import React, { Component } from "react"
import styled from "styled-components"
import CatalogLinks from "./catalogLinks/catalogLinks"
import CustomerLinks from "./customerLinks"
import Search from "./search/search"
import Cart from "./cart"
import MobileHeader from "./mobile/header"

export default class Line extends Component {
  render() {
    return (
      <Block>
        <MobileHeader />
        <Container className="container">
          <Wrap>
            <CatalogLinks />
          </Wrap>
          <Wrap data-type="links">
            <CustomerLinks />
          </Wrap>
          <Search />
          <RightBlock>
            <Cart />
          </RightBlock>
        </Container>
      </Block>
    )
  }
}

const Wrap = styled.div`
  position: relative;
  cursor: pointer;

  @media (max-width: 767px) {
    display: none;
  }
`

const Block = styled.div`
  color: white;

  @media (min-width: 768px) {
    background-color: #26a9ff;
    background-image: url(shop/textures/1.png);
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /*
  @media (max-width: 480px) {
    flex-flow: column nowrap;
    padding: 0;
  }
  */

  @media (max-width: 767px) {
    display: none;
  }
`

const RightBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 480px) {
    display: none;
  }
`
