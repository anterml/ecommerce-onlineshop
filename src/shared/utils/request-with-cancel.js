import request from "superagent"
import config from "server/config/base"

const makeCancelable = promise => {
  let hasCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      res => (hasCanceled ? reject({ isCanceled: true }) : resolve(res.body)),
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true
    },
  }
}

export default ({ url, method, headers, data, prefixUrl }, isCancelable) => {
  const origin =
    typeof window === "object" &&
    (window.location.origin === "https://yoursite.herokuapp.com" ||
      window.location.origin === "http://localhost:5000")
      ? window.location.origin
      : config.siteUrl

  const fullUrl = `${origin}/${prefixUrl || "api/v1"}/${url}`
  const req = request[method || "get"](fullUrl)

  if (headers) req.set(headers)

  if (data) req.send(data)

  return isCancelable ? makeCancelable(req) : req
}
