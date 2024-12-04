import asyncRequest from "utils/request"

export const fetch = data => dispatch => {
  const params = {
    url: "brands/mebel",
  }

  if (data && data.Cookie) params.headers = { Cookie: data.Cookie }

  return dispatch({
    types: ["brands/request", "brands/success", "brands/failure"],
    callAPI: () => asyncRequest(params),
  })
}
