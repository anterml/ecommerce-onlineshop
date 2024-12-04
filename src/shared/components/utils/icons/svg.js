import React from "react"

const Icon = ({ name }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    dangerouslySetInnerHTML={{ __html: `<use xlink:href="#${name}" />` }}
  />
)

export default Icon
