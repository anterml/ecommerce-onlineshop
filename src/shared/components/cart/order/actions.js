import asyncRequest from "utils/request"

export const create = data => dispatch => {
  const params = {
    url: `order`,
    method: "post",
    data,
  }

  return dispatch({
    types: [
      "cart/order/creating-request",
      "cart/order/creating-success",
      "cart/order/creating-failure",
    ],
    callAPI: () => asyncRequest(params),
  })
}

export const getUniqueOrderCode = () => dispatch => {
  const params = {
    url: "order/get-unique-code",
  }
  return asyncRequest(params)
}

export const addComment = comment => ({
  type: "cart/order/add_comment",
  comment,
})

export const setId = id => ({
  type: "cart/order/set_order-id",
  id,
})

export const done = () => ({
  type: "cart/order/done",
})

export const clear = () => ({
  type: "cart/order/clear",
})

export const setStatus = status => ({
  type: "cart/order/set_status",
  status,
})
