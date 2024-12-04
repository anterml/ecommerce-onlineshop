import { combineReducers } from "redux"

import product from "./productReducer"
import productSlider from "./productSlider/reducer"
import productSlider3 from "./productSlider3/reducer"

export default combineReducers({
  product,
  productSlider,
  productSlider3,
})
