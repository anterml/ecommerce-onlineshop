import { combineReducers } from "redux"
import auth from "../components/auth/reducer"
import admin from "../components/admin/reducer"

const rootReducer = combineReducers({
  auth,
  admin,
})

export default rootReducer
