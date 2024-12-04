import { combineReducers } from "redux"

import groups from "./groups/reducer"
import configurations from "./configurations/reducer"
import settings from "./settings/reducer"

export default combineReducers({
  configurations,
  groups,
  settings,
})
