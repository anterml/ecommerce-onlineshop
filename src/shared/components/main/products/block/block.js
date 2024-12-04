import React from "react"
import useViewport from "globalComponents/useViewport"
import Slider from "./slider"

const Block = props => {
  const elemId = "main-page-product-slider_" + props.name
  const viewport = useViewport(elemId)
  return (
    <Slider
      {...props}
      viewport={viewport}
      elemId={elemId}
    />
  )
}

export default Block
