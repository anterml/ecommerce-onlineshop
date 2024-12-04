import asyncRequest from "utils/request"

export const login = () => ({
  type: "auth/login",
})

export const logout = () => dispatch => {
  const params = {
    prefixUrl: "api",
    url: "auth/logout",
  }

  return asyncRequest(params).then(() => {
    dispatch({ type: "auth/logout" })
  })
}
