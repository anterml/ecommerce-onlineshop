import React from "react"
import loadable from "loadable-components"
import { Route } from "react-router-dom"

import App from "./components/app/client/client"

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
        path: "/",
        exact: true,
        component: loadable(() => import("./components/main/main")),
      },
      {
        path: "/catalog/:department/:category/*/",
        component: loadable(() => import("./components/catalog/catalog")),
      },
      {
        path: "/catalog2/:department/:category/*/",
        component: loadable(() => import("./components/catalog2/catalog")),
      },

      {
        path: "/mebel/kuhnya/:urlName",
        component: loadable(() => import("./components/product-kuhni/product")),
      },

      {
        path: "/(mebel|electronics)/:category/:urlName",
        component: loadable(() => import("./components/product/product")),
      },

      {
        path: "/mebel-kuhni/:category/:urlName",
        component: loadable(() => import("./components/product-kuhni/product")),
      },

      {
        path: "/department/**",
        component: loadable(() => import("./components/department/department")),
      },

      {
        path: "/cart",
        component: loadable(() => import("./components/cart/cart")),
      },

      {
        path: "/order/:id",
        component: loadable(() => import("./components/order/order")),
      },

      {
        path: "/brands/mebel/:brand*",
        component: loadable(() => import("./components/brands/mebel/brands")),
      },

      {
        path: "/dostavka-i-oplata",
        component: loadable(() =>
          import("./components/pure/delivery-and-payment"),
        ),
      },

      {
        path: "/kak-oformit-zakaz",
        component: loadable(() => import("./components/pure/product-order")),
      },

      {
        path: "/kontakty",
        component: loadable(() =>
          import("./components/pure/contacts/contacts"),
        ),
      },

      {
        path: "/garantiya",
        component: loadable(() => import("./components/pure/guarantee")),
      },

      {
        path: "/rassrochka-i-credit",
        component: loadable(() =>
          import("./components/pure/rassrochka-i-credit"),
        ),
      },

      {
        path: "/polzovatelskoe-soglashenie-ob-ispolzovanii-personalnih-dannih",
        component: loadable(() =>
          import(
            "./components/pure/polzovatelskoe-soglashenie-ob-ispolzovanii-personalnih-dannih"
          ),
        ),
      },

      {
        path: "/politika-konfidentsialnosti-personalnoi-informatsii",
        component: loadable(() =>
          import(
            "./components/pure/politika-konfidentsialnosti-personalnoi-informatsii"
          ),
        ),
      },

      {
        path: "/vakansii",
        component: loadable(() => import("./components/pure/vacancy")),
      },

      {
        path: "*",
        component: NotFound,
      },
    ],
  },
]

export default routes
