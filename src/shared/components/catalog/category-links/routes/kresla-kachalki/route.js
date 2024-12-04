import React from "react"
import Links from "../links"
import { RU, ENG, DATA, NOINDEX_URLS } from "./data"

export default props => (
  <Links
    category="kresla-kachalki"
    categoryRu="Кресла-качалки"
    RU={RU}
    ENG={ENG}
    DATA={DATA}
    NOINDEX_URLS={NOINDEX_URLS}
    BOTTOM_LINKS={[
      { ru: "Кресла", eng: "kresla" },
      { ru: "Кресла-мешки", eng: "kresla-meshki" },
    ]}
    {...props}
  />
)
