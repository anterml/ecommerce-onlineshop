import React from "react"
import styled from "styled-components"
import { renderRoutes } from "react-router-config"
import Header from "./header/header"
import Footer from "./footer/footer"

const ClientLayout = ({ route, location }) => (
  <Block>
    <Header location={location} />
    <Container className="container">{renderRoutes(route.routes)}</Container>
    <Footer location={location} />
  </Block>
)

export default ClientLayout

const Block = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
`

const Container = styled.div`
  flex: 1 1 auto;
  width: 100%;
`
