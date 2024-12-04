import React, { Fragment } from "react"

const NoIndex = ({ children }) => (
  <Fragment>
    <span dangerouslySetInnerHTML={{ __html: "<!--noindex-->" }} />
    {children}
    <span dangerouslySetInnerHTML={{ __html: "<!--/noindex-->" }} />
  </Fragment>
)

export default NoIndex
