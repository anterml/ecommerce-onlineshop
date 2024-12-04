import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import loadable from "loadable-components"

const ClientLayout = loadable(() =>
  import(/* webpackChunkName: "client" */ "./client/client"),
)
const AdminLayout = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./admin/admin"),
)

const App = ({ route, location }) => (
  <Switch>
    <Route path="/admin">
      {route.auth.admin ? <AdminLayout route={route} /> : <Redirect to="/" />}
    </Route>
    <Route
      path="*"
      route={route}
    >
      <ClientLayout
        route={route}
        location={location}
      />
    </Route>
  </Switch>
)

export default App
