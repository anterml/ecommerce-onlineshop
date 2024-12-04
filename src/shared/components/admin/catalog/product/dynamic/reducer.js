import { combineReducers } from "redux"
import parts from "./kuhnya/parts/reducer"
import isTemplate from "./kuhnya/controls/reducer"

export default combineReducers({
  // модули для кухонь
  parts,
  isTemplate,
})
