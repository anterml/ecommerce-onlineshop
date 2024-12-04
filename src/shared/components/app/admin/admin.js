import React, { Fragment } from "react"
import styled from "styled-components"
import { renderRoutes } from "react-router-config"
import Header from "./header/header"

const AdminLayout = ({ route }) => (
  <Fragment>
    <Header auth={route.auth} />
    <Wrap>{renderRoutes(route.routes)}</Wrap>
  </Fragment>
)

export default AdminLayout

const Wrap = styled.section`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  width: 100%;
  max-width: 1343px;
  margin: 0 auto;
  overflow: hidden;

  & *::-webkit-scrollbar-track {
    background-color: #b5b5b5;
  }

  & *::-webkit-scrollbar-thumb {
    border: 0px solid rgb(255, 255, 255);
    min-height: 30px;
    background-color: #777;
  }

  & *::-webkit-scrollbar {
    width: 5px;
  }
`
