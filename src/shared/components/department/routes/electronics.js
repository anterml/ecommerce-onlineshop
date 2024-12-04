import React from "react"
import Links from "../links"

const values = [
  { eng: "zaschischennie-telefoni", ru: "Защищенные телефоны" },
  { eng: "zaschischennie-smartfoni", ru: "Защищенные смартфоны" },
]

export default props => (
  <Links
    department="electronics"
    values={values}
    {...props}
  />
)
