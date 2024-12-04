import { combineReducers } from "redux"

import status from "./status/reducer"
import base from "./base/reducer"
import settings from "./settings/reducer"
import seo from "./seo/reducer"
import images from "./images/reducer"
import { attrs, sattrs } from "./attrs/reducer"
import vars from "./vars/reducer"
import general from "./general/reducer"
import dynamic from "./dynamic/reducer"

export default combineReducers({
  status,
  value: combineReducers({
    base,
    settings,
    seo,
    images,
    attrs,
    sattrs,
    vars,
    general,
    dynamic,
  }),
})
