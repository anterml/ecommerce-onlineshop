import asyncRequest from "utils/request"

export const fetch =
  ({ category, query, Cookie }) =>
  dispatch => {
    const params = {
      url: `catalog/filter3/${category}`,
    }

    if (Cookie) params.headers = { Cookie }

    return dispatch({
      types: [
        "catalog/filter/request",
        "catalog/filter/success",
        "catalog/filter/failure",
      ],
      callAPI: () => asyncRequest(params),
      payload: {
        category,
        query: query || {},
      },
    })
  }
