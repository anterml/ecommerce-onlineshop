import React from "react"
import loadable from "loadable-components"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"

// НЕ УДАЛЯТЬ! Иначе они перейдут в общий bootstrap.js
import getNoIndexUrls from "./routes/getNoIndexURLS"
import Links from "./routes/links"
// ---------------------------------------------------

const PATH = "/catalog/"

const routes = [
  ["banketki", loadable(() => import("./routes/banketka/route"))],
  ["komodi", loadable(() => import("./routes/komodi/route"))],
  ["kresla", loadable(() => import("./routes/kresla/route"))],
  ["kresla-meshki", loadable(() => import("./routes/kresla-meshki/route"))],
  ["kresla-kachalki", loadable(() => import("./routes/kresla-kachalki/route"))],
  ["pufiki", loadable(() => import("./routes/pufiki/route"))],
  ["stulya", loadable(() => import("./routes/stul/route"))],
  ["stoli", loadable(() => import("./routes/stol/route"))],
  [
    "zaschischennie-telefoni",
    loadable(() => import("./routes/sp_telefoni/route")),
    "electronics",
  ],
  [
    "zaschischennie-smartfoni",
    loadable(() => import("./routes/sp_smartfoni/route")),
    "electronics",
  ],
  [
    "zaschischennie-telefoni-i-smartfoni",
    loadable(() => import("./routes/sp_smartfoni-i-telefoni/route")),
    "electronics",
  ],
]

const CategoryLinks = () => (
  <Block>
    <Switch>
      {routes.map(([name, Component, department]) => (
        <Route
          path={PATH + (department || "mebel") + "/" + name + "/*"}
          component={Component}
          key={name}
        />
      ))}
    </Switch>
  </Block>
)

export default CategoryLinks

const Block = styled.div`
  margin-bottom: 20px;
  & a {
    display: block;
    margin-bottom: 5px;
  }
`
