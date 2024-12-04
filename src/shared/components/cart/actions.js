import asyncRequest from "utils/request"

export const add = (product, options) => ({
  type: "cart/add",
  product,
  options,
})

export const remove = product => ({
  type: "cart/remove",
  product,
})

export const removeAll = () => ({
  type: "cart/remove_all",
})

export const clear = () => ({
  type: "cart/clear",
})

export const changeCount = (product, count) => ({
  type: "cart/change_count",
  product,
  count,
})

export const changeServices = (oldProduct, newProduct) => ({
  type: "cart/change_services",
  oldProduct,
  newProduct,
})

export const fillFromLocalStorage = () => ({
  type: "cart/fill_from_localstorage",
})

export const setTransactionId = transactionId => ({
  type: "cart/set_transactionId",
  transactionId,
})
