import React, { Fragment } from "react"
import Groups from "./groups/groups"
import Secondary from "./secondary/secondary"

const Edit = ({ configuration, groups, actions }) => (
  <Fragment>
    <Groups {...{ groups, configuration, actions }} />
    <Secondary {...{ configuration, actions }} />
  </Fragment>
)

export default Edit
