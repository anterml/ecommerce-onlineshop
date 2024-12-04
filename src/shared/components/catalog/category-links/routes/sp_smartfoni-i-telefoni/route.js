import React from "react"
import Links from "../links"
import { RU, ENG, DATA, NOINDEX_URLS } from "./data"

export default props => (
  <Links
    category="zaschischennie-telefoni-i-smartfoni"
    categoryRu="Защищенные телефоны и смартфоны"
    RU={RU}
    ENG={ENG}
    DATA={DATA}
    NOINDEX_URLS={NOINDEX_URLS}
    department="electronics"
    BOTTOM_LINKS={[
      { ru: "Защищенные телефоны", eng: "zaschischennie-telefoni" },
      { ru: "Защищенные смартфоны", eng: "zaschischennie-smartfoni" },
    ]}
    {...props}
  />
)
