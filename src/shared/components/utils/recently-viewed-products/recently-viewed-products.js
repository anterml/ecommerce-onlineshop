import React, { PureComponent } from "react"
import loadable from "loadable-components"
import recentlyViewedProducts from "utils/localstorage/recently-viewed-products"

const Slider = loadable(() => import("globalComponents/slider/slider"))
const SLIDER_NAME = "Вы недавно смотрели"

const excludeCurrentProduct = (products, urlName) =>
  products.filter(product => product.base.urlName !== urlName)

export default class RecentlyViewedProducts extends PureComponent {
  state = {
    products: [],
    loaded: false,
  }

  componentDidMount() {
    this.handleWindowScroll()
  }

  componentDidUpdate(prevProps) {
    const { needUpdate, urlName } = this.props
    if (
      this.state.loaded &&
      typeof needUpdate === "function" &&
      needUpdate(prevProps, this.props)
    ) {
      const { products } = recentlyViewedProducts()
      this.setState(() => ({
        products: excludeCurrentProduct(products, urlName),
      }))
    }
  }

  handleWindowScroll() {
    const elem = document.querySelector(`[data-slider-name="${SLIDER_NAME}"]`)

    if (!elem) return

    this.scrollWindow = () => {
      const { top } = elem.getBoundingClientRect()
      // если блок виден на экране,
      // тогда показываем содержимое и удаляем событие скрола
      if (top - window.innerHeight <= 0) {
        const { products } = recentlyViewedProducts()
        const state = { loaded: true }

        if (products.length)
          state.products = excludeCurrentProduct(products, this.props.urlName)

        this.setState(() => state)
        window.removeEventListener("scroll", this.scrollWindow)
      }
    }

    window.addEventListener("scroll", this.scrollWindow)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollWindow)
  }

  render() {
    const { products, loaded } = this.state

    return (
      <div
        onClick={this.scrollTop}
        data-slider-name={SLIDER_NAME}
      >
        {!!products.length && loaded && (
          <Slider
            name={SLIDER_NAME}
            values={products}
            totalCount={products.length}
          />
        )}
      </div>
    )
  }

  scrollTop = e => {
    if (e.target.nodeName.toLowerCase() === "a") window.scrollTo(0, 106)
  }
}
