import React from "react"
import { hydrate } from "react-dom"
import BrowserRouter from "react-router-dom/BrowserRouter"
import { renderRoutes } from "react-router-config"
import { Provider } from "react-redux"

import configureStore from "../shared/redux/admin-store"

import { loadComponents } from "loadable-components"

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

const renderApp = () => {
  const routes = require("../shared/admin-routes").default(
    store.getState().auth,
  )
  loadComponents().then(() => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </Provider>,
      document.querySelector("#app"),
    )
  })
}

if (module.hot) module.hot.accept("../shared/admin-routes", () => renderApp())

renderApp()
