import asyncRequest from "utils/request"

const url = "brands/products"

export const fetch =
  ({ brand, search, page = 0, Cookie }) =>
  dispatch => {
    const params = {
      url: `brands/mebel/products/${brand + search}`,
    }

    if (Cookie) params.headers = { Cookie }

    return dispatch({
      types: [`${url}/request`, `${url}/success`, `${url}/failure`],
      callAPI: () => asyncRequest(params),
      payload: {
        page,
        brand,
      },
    })
  }

export const reset = () => ({ type: `${url}/reset` })
