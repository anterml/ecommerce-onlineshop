import React, { Component, Fragment } from "react"
import Slider from "./slider/slider"
import Products from "./products/products"
import Description from "./description/description"
import Map from "./map/map"
//import TouchSlider from './touch-slider/touch-slider'

export default class MainPage extends Component {
  static title = "yoursite.ru – Интернет-магазин"

  static fetchData(arg) {
    return Products.fetchData(arg)
  }

  componentDidMount() {
    document.title = this.constructor.title
  }

  render() {
    return (
      <Fragment>
        {/*<TouchSlider />*/}
        <Slider />
        <Products />
        <Description />
        <Map />
      </Fragment>
    )
  }
}
