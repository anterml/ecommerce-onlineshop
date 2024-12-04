import { combineReducers } from "redux"
import main from "../components/main/products/reducer"

import products from "../components/catalog/products/reducer"
import filter from "../components/catalog/filter/reducer"

import product from "../components/product/reducer"
import cart from "../components/cart/reducer"
import auth from "../components/auth/reducer"

import brands from "../components/brands/mebel/reducer"

const rootReducer = combineReducers({
  cart,
  auth,
  main,
  catalog: combineReducers({
    products,
    filter,
  }),
  product,
  brands,
})

export default rootReducer
