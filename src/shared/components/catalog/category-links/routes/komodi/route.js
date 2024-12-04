import React from "react"
import Links from "../links"
import { RU, ENG, DATA, NOINDEX_URLS } from "./data"

export default props => (
  <Links
    category="komodi"
    categoryRu="Комоды"
    RU={RU}
    ENG={ENG}
    DATA={DATA}
    NOINDEX_URLS={NOINDEX_URLS}
    {...props}
  />
)
