import asyncRequest from "utils/request"

export const fetch =
  ({ urlName, Cookie, isServerSide }) =>
  dispatch => {
    const params = {
      url: `product/${urlName}`,
    }

    if (isServerSide) params.url += `?isServerSide=${!!isServerSide}`

    if (Cookie) params.headers = { Cookie }

    return dispatch({
      types: ["product/request", "product/success", "product/failure"],
      payload: urlName,
      callAPI: () => asyncRequest(params),
    })
  }

export const makeOrder = data => dispatch => {
  const params = {
    url: "api/order2",
    method: "post",
    data,
  }

  return asyncRequest(params)
}

export const createRevision = (revisionStatus, data) => dispatch => {
  dispatch({
    type: "product/change_revision-status",
    // productId используется для обновления в слайдере продуктов
    productId: data.product._id,
    revisionStatus,
  })

  const params = {
    url: "api/admin/revision",
    method: "post",
    data,
  }

  return asyncRequest(params)
}

export const setInitialState = () => ({
  type: "product/set_initial-state",
})

export const togglePart = code => ({
  type: "product/toggle_part",
  code,
})

export const changeCountInset = (code, value) => ({
  type: "product/change_part-count-inset",
  code,
  value,
})
