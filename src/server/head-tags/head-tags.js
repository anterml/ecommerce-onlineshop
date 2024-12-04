import getGeneral from "./general/general"
import { getCanonicalUrl } from "server/middleware/redirects"

export default (branch, state, req) => {
  const title = getTitle(branch, state, req.path)
  const general = getGeneral(branch, state, req, title)
  const canonical = getCanonical(req)
  return general + "\n" + canonical
}

function getCanonical(req) {
  const [url, query] = req.url.split("?")
  let canonicalUrl = getCanonicalUrl(url, query)
  canonicalUrl = replaceCanonicalUrl(canonicalUrl)
  return `<link rel="canonical" href="https://www.yoursite.ru${canonicalUrl}" />`
}

function replaceCanonicalUrl(url) {
  if (url.indexOf("/brands/mebel") !== -1) return url.split("?")[0]
  return url
}

function getTitle(branch, state, url) {
  const title = branch.reduce(
    (title, { route }) => route.component.title || title,
    null,
  )

  if (!title) return "Интернет магазин yoursite.ru"

  return typeof title === "function" ? title(state, url) : title
}
