import React from "react"

import Popup from "./popup"
import Tabs from "../tabs/tabs"
import Auto from "./auto/auto"
import Manual from "./manual/manual"

const FastCreatingPrintviews = props => (
  <Popup
    {...props}
    title="Быстрое создание принтов"
  >
    <Tabs>
      <Auto {...props} />
      <Manual addFields={props.addFields} />
    </Tabs>
  </Popup>
)

export default FastCreatingPrintviews
