import React, { Component, Fragment } from "react"

import Tabs from "./tabs"
import Groups from "./groups/container"
import Configurations from "./configurations/configurations"
import Settings from "./settings/settings"

const Vars = ({ location, history, query, vars, category, actions, auth }) => {
  const queryTab = "varsTab"
  const selectedTab = query[queryTab] || "groups"
  const { groups, configurations, settings } = vars

  return (
    <Fragment>
      <Tabs {...{ query, location, history, queryTab }} />
      {selectedTab === "groups" && (
        <Groups
          {...{ groups, category }}
          actions={actions.groups}
        />
      )}
      {selectedTab === "configs" && (
        <Configurations
          {...{ groups, configurations }}
          actions={actions.configurations}
        />
      )}
      {selectedTab === "settings" && (
        <Settings {...{ settings, groups, auth, actions }} />
      )}
    </Fragment>
  )
}

export default Vars
