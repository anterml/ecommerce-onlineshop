import { combineReducers } from "redux"
import catalog from "./catalog/reducer"
//import listing from './orders/listing/reducer'
//import order from './orders/order/reducer'

export default combineReducers({
  catalog,
  /*
  orders: combineReducers({
    listing,
    order,
  })
  */
})
