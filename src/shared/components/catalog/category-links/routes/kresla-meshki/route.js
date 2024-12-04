import React from "react"
import Links from "../links"
import { RU, ENG, DATA, NOINDEX_URLS } from "./data"

export default props => (
  <Links
    category="kresla-meshki"
    categoryRu="Кресла мешки"
    RU={RU}
    ENG={ENG}
    DATA={DATA}
    NOINDEX_URLS={NOINDEX_URLS}
    BOTTOM_LINKS={[
      { ru: "Кресла", eng: "kresla" },
      { ru: "Кресла-качалки", eng: "kresla-kachalki" },
    ]}
    {...props}
  />
)
