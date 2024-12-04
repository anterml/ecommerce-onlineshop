import React from "react"
import styled from "styled-components"
import { Route } from "react-router-dom"

const ErrorStatus = ({ code, text }) => (
  <Route
    render={props => {
      if (props.staticContext) {
        props.staticContext.status = code
      }
      return <Text>{text}</Text>
    }}
  />
)

export default ErrorStatus

const Text = styled.div`
  margin: 100px 0;
  height: 100%;
  text-align: center;
  color: #b30202;
  font-size: 20px;
  font-weight: 500;
`
