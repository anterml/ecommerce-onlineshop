import path from "path"
import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"
import passport from "passport"

import React from "react"
import { matchRoutes, renderRoutes } from "react-router-config"
import { Provider } from "react-redux"

import { ServerStyleSheet, StyleSheetManager } from "styled-components"
import { getLoadableState } from "loadable-components/server"
import StaticRouter from "react-router-dom/StaticRouter"
import { renderToString } from "react-dom/server"
import configureStore from "../shared/redux/store"
import configureAdminStore from "../shared/redux/admin-store"
import getHeadTags from "./head-tags/head-tags"
import config from "./config/secret"
import { redirectsBeforeAuth, redirectsAfterAuth } from "./middleware/redirects"
import { asyncHandler } from "./handlers"
import {
  render,
  renderHTML500,
  renderTestPageForYandexWebvisor,
} from "./html/base-markup"

const app = express()
app.set("port", process.env.PORT || 5000)

if (process.env.NODE_ENV !== "production") require("./webpack")(app)

const outputFolder = process.env.NODE_ENV !== "production" ? "dev" : "dist"

app.use("/" + outputFolder, express.static(path.resolve(outputFolder)))
app.use(express.static(path.resolve("static")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(redirectsBeforeAuth)

require("./passport").default(passport)

const MongoStore = require("connect-mongodb-session")(session)
app.use(
  session({
    store: new MongoStore(
      {
        uri: config.dbPath,
        collection: "sessions",
        expires: 1000 * 60 * 60 * 24, // 1 day
      },
      error => {},
    ),
    secret: "yoursecretword",
    resave: true,
    saveUninitialized: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use(redirectsAfterAuth)

app.use("/api/v1/main", require("./api/client/main").default)
app.use("/api/v1/catalog", require("./api/client/catalog").default)
app.use("/api/v1/product", require("./api/client/product/product").default)
app.use("/api/v1/order", require("./api/client/order").default)
app.use("/api/v1/brands", require("./api/client/brands").default)
app.use("/api/v1/admin/catalog", require("./api/admin/catalog").default)
app.use("/api/v1/admin/orders", require("./api/admin/orders").default)
app.use("/api/v1/admin/stats", require("./api/admin/stats").default)
app.use("/api/v1/admin/sets", require("./api/admin/sets").default)
app.use("/api/v1/admin/display", require("./api/admin/display").default)
app.use(
  "/api/v1/admin/instock-products",
  require("./api/admin/instock-products").default,
)
app.use(
  "/api/v1/admin/section-words",
  require("./api/admin/section-words").default,
)
app.use("/api/v1/admin/seo", require("./api/admin/seo").default)
app.use("/api/auth", require("./api/auth").default)
app.use("/api/v1", require("./api/other").default)
app.use("/api/v1/yml", require("./api/yml/yml").default)

app.get(
  "/test-webvisor",
  asyncHandler(async (req, res) => {
    res.send(renderTestPageForYandexWebvisor())
  }),
)

app.get(
  "*",
  asyncHandler(async (req, res, next) => {
    const isAdminPath = req.url.indexOf("/admin/") === 0
    const store = isAdminPath ? configureAdminStore() : configureStore()

    loginIfNeed(req, store)

    const routes = isAdminPath
      ? require("../shared/admin-routes").default(store.getState().auth)
      : require("../shared/routes").default(store.getState().auth)

    const sheet = new ServerStyleSheet()
    const context = {}

    const app = (
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    )

    const loadableState = await getLoadableState(app)

    const Cookie = req.headers.cookie
    const branch = matchRoutes(routes, req.url)
    const promises = branch.map(({ route, match }) => {
      const fetchData = route.component.fetchData
      return fetchData instanceof Function
        ? fetchData({
            dispatch: store.dispatch,
            props: store.getState(),
            params: match.params,
            match,
            url: req.url,
            Cookie,
          })
        : Promise.resolve(null)
    })

    await Promise.all(promises)
    const content = renderToString(app)

    if (context.status && context.status !== 200) {
      res.status(context.status)
    }

    const state = store.getState()
    const scripts = loadableState.getScriptTag()
    const styles = sheet.getStyleTags()
    const headTags = getHeadTags(branch, state, req)
    const initialState = JSON.stringify(state)

    res.send(
      render({
        headTags,
        styles,
        content,
        initialState,
        scripts,
        isAdmin: req.user && req.user.admin,
        isAdminPath,
      }),
    )
  }),
)

function loginIfNeed(req, store) {
  if (req.isAuthenticated()) {
    store.dispatch({
      type: "auth/login",
      user: req.user,
    })
  }
}

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500
    res.status(err.statusCode).send(renderHTML500())
  }
})

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"))
})
