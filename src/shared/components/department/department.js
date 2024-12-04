import React, { Component } from "react"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"
import loadable from "loadable-components"
import ErrorStatus from "./error-status"

// НЕ УДАЛЯТЬ! Иначе файл перейдёт в общий bootstrap.js
import Links from "./links"
// ---------------------------------------------------

const PATH = "/department/"
const NOTFOUND_TEXT = "Раздел не найден"

const routes = [
  ["mebel", loadable(() => import("./routes/mebel"))],
  ["electronics", loadable(() => import("./routes/electronics"))],
]

const getTitle = url => {
  const last = url.split("/").pop()

  switch (last) {
    case "mebel":
      return "Купить мебель в интернет-магазине yoursite"

    case "electronics":
      return "Купить защищенные телефоны и смартфоны. Каталог электроники в интернет-магазине yoursite"

    default:
      return NOTFOUND_TEXT
  }
}

const getHeaderText = url => {
  const last = url.split("/").pop()

  switch (last) {
    case "mebel":
      return "Каталог мебели"

    case "electronics":
      return "Каталог электроники"

    default:
      return NOTFOUND_TEXT
  }
}

export default class Department extends Component {
  static title = (_, url) => {
    return getTitle(url)
  }

  componentDidMount() {
    document.title = getTitle(this.props.location.pathname)
  }

  componentDidUpdate() {
    document.title = getTitle(this.props.location.pathname)
  }

  render() {
    const headerText = getHeaderText(this.props.location.pathname)

    if (headerText === NOTFOUND_TEXT)
      return (
        <ErrorStatus
          code={404}
          text={NOTFOUND_TEXT}
        />
      )

    return (
      <main>
        <Header>{headerText}</Header>
        <Switch>
          {routes.map(([department, Comp]) => (
            <Route
              path={PATH + department}
              component={Comp}
              exact={true}
              key={department}
            />
          ))}
        </Switch>
      </main>
    )
  }
}

const Header = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin: 40px 0;
`
