import React from "react"
import styled from "styled-components"
import { Route } from "react-router-dom"

const Status = ({ code, text }) => (
  <Route
    render={props => {
      if (props.staticContext) {
        props.staticContext.status = code
      }
      return <Text>{text}</Text>
    }}
  />
)

const ErrorServerHandler = ({ code }) => {
  switch (code) {
    case 404:
      return (
        <Status
          text="Продукт не найден"
          code={code}
        />
      )
    default:
      return (
        <Status
          text="Не получилось загрузить продукт"
          code={code}
        />
      )
  }
}

export default ErrorServerHandler

const Text = styled.div`
  height: 100%;
  text-align: center;
  color: #b30202;
  font-size: 20px;
  font-weight: 500;
`
