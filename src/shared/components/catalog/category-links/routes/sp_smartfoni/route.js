import React from "react"
import Links from "../links"
import { RU, ENG, DATA, NOINDEX_URLS } from "./data"

export default props => (
  <Links
    category="zaschischennie-smartfoni"
    categoryRu="Защищенные смартфоны"
    RU={RU}
    ENG={ENG}
    DATA={DATA}
    NOINDEX_URLS={NOINDEX_URLS}
    department="electronics"
    TOP_LINKS={[
      {
        ru: "Защищенные телефоны и смартфоны",
        eng: "zaschischennie-telefoni-i-smartfoni",
      },
    ]}
    BOTTOM_LINKS={[
      { ru: "Защищенные телефоны", eng: "zaschischennie-telefoni" },
    ]}
    {...props}
  />
)