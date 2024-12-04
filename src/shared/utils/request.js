import request from "superagent"
import config from "../../server/config/base"

export default ({ url, method, headers, data, prefixUrl }) => {
  return new Promise((resolve, reject) => {
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

    req.end((err, res) => {
      if (err) {
        console.log("BAD REQUEST", fullUrl)
        return reject(err)
      }

      try {
        resolve(res.body)
      } catch (e) {
        console.log("The error in utils/request.js", e)
        reject(e)
      }
    })
  })
}
