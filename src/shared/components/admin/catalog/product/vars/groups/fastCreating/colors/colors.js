import React from "react"

import Popup from "./popup"
import Tabs from "../tabs/tabs"
import Auto from "./auto/auto"
import Manual from "./manual/manual"

const FastCreatingPrintviews = props => (
  <Popup {...props}>
    <Tabs>
      <Auto {...props} />
      <Manual {...props} />
    </Tabs>
  </Popup>
)

export default FastCreatingPrintviews
