import asyncRequest from "utils/request"
const path = "main/products/"

export const fetch = () => dispatch => {
  const params = {
    url: path,
  }

  return dispatch({
    types: [path + "request", path + "success", path + "failure"],
    callAPI: () => asyncRequest(params),
  })
}

export const upload = (blockName, ids) => dispatch => {
  const params = {
    url: `${path}items?ids=${ids}`,
  }

  return dispatch({
    types: [
      path + "upload/request",
      path + "upload/success",
      path + "upload/failure",
    ],
    callAPI: () => asyncRequest(params),
    payload: {
      blockName,
    },
  })
}
