import asyncRequest from "utils/request"
const path = "admin/catalog/product/"

export const fetch = urlName => dispatch => {
  const params = {
    url: path + urlName,
  }

  return dispatch({
    types: [path + "request", path + "success", path + "failure"],
    callAPI: () => asyncRequest(params),
  })
}
