import React from "react"
import loadable from "loadable-components"
import { Route } from "react-router-dom"

import App from "./components/app/admin/admin"

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

const NotFound = () => (
  <Status code={404}>
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        width: "100%",
        fontSize: "30px",
      }}
    >
      <strong>Страница не найдена</strong>
    </div>
  </Status>
)

const routes = auth => [
  {
    component: App,
    auth,
    routes: [
      {
        path: "/admin/catalog=:category/product=:urlName/",
        component: loadable(() => import("./components/admin/catalog/catalog")),
      },

      {
        path: "/admin/orders/",
        component: loadable(() => import("./components/admin/orders/orders")),
      },

      {
        path: "/admin/stats/employees/",
        component: loadable(() =>
          import("./components/admin/stats/employees/employees"),
        ),
      },

      {
        path: "/admin/sets/",
        component: loadable(() => import("./components/admin/sets/sets")),
      },

      {
        path: "/admin/colors/",
        component: loadable(() => import("./components/admin/colors/colors")),
      },

      {
        path: "/admin/display/",
        component: loadable(() => import("./components/admin/display/display")),
      },

      {
        path: "/admin/instock-products",
        component: loadable(() =>
          import("./components/admin/instock-products/instock-products"),
        ),
      },

      {
        path: "/admin/section-words",
        component: loadable(() =>
          import("./components/admin/section-words/section-words"),
        ),
      },

      {
        path: "/admin/seo/templates",
        component: loadable(() => import("./components/admin/seo/seo")),
      },

      {
        path: "*",
        component: NotFound,
      },
    ],
  },
]

export default routes
