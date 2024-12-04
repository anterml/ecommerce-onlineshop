import { combineReducers } from "redux"

import stats from "./stats/reducer"
import products from "./products/reducer"

export default combineReducers({
  stats,
  products,
})
