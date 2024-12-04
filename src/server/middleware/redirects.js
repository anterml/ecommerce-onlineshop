const oldCategories = {
  banketka: "banketki",
  komod: "komodi",
  kreslo: "kresla",
  kreslo_kachalka: "kresla-kachalki",
  kreslo_meshok: "kresla-meshki",
  puf: "pufiki",
  stul: "stulya",
  stol: "stoli",
}

const urlMustBeWithTrailingSlash = url =>
  url.indexOf("/catalog_premium/") === 0 ||
  url.indexOf("/catalog/") === 0 ||
  url.indexOf("/brands/") === 0

const clearQuery = url => {
  const category = url.split("/")[3]
  return Object.values(oldCategories).includes(category)
}

export const getCanonicalUrl = (url, query) => {
  const slashEnding = url[url.length - 1] === "/"
  let result

  if (urlMustBeWithTrailingSlash(url)) {
    result = slashEnding ? url : url + "/"
    // remove queries for new categories in /catalog/*
    if (clearQuery(url)) query = ""
  } else {
    result = slashEnding ? url.slice(0, -1) : url
  }

  return query ? result + "?" + query : result
}

export const getUrl = (url, query) => {
  const slashEnding = url[url.length - 1] === "/"
  let result

  if (urlMustBeWithTrailingSlash(url)) {
    result = slashEnding ? url : url + "/"
  } else {
    result = slashEnding ? url.slice(0, -1) : url
  }

  return query ? result + "?" + query : result
}

export const redirectsBeforeAuth = (req, res, next) => {
  if (req.path.indexOf("/credit-mebel") === 0) {
    return res.redirect(301, "rassrochka-i-credit")
  }
  // general paths
  if (req.path.indexOf("stoli-kts") !== -1) {
    const newUrl = getFullUrl(req, req.path.replace("stoli-kts", "stoli-kst"))
    return res.redirect(301, newUrl)
  }

  // old catalog categories
  if (req.path.indexOf("/catalog/") === 0) {
    const newPath = oldCatalogUrls(req)
    if (newPath) {
      const newUrl = getFullUrl(req, newPath)
      return res.redirect(301, newUrl)
    } else {
      const split = req.path.substr(1).split("/")
      const categoryIndex = 2
      const skipCategory = [
        "winniy_shkaf",
        "detskaya_krovat",
        "tualetniy_stolik",
        "divan_krovat",
      ]
      const category = split[categoryIndex]
      if (
        typeof category === "string" &&
        category.indexOf("_") !== -1 &&
        !skipCategory.includes(category)
      ) {
        let newPath = split
          .map((v, i) => (i !== categoryIndex ? v : v.replace("_", "/")))
          .join("/")
        if (newPath[newPath.length - 1] !== "/") newPath += "/"
        const newUrl = getFullUrl(req, "/" + newPath)
        return res.redirect(301, newUrl)
      }
    }
  }

  // http2https for production
  if (process.env.NODE_ENV === "production") {
    if (
      req.headers["x-forwarded-proto"] !== "https" &&
      req.hostname !== "localhost"
    ) {
      const newPath = getUrl(req.path)
      const query = req.url.slice(req.path.length)
      return res.redirect(301, "https://" + req.hostname + newPath + query)
    }
  }

  // обработать редиректы со слешем на конце.
  // неучитывает внутренние запросы к api
  if (req.path.length > 1 && req.path.indexOf("/api/v1/") === -1) {
    const newPath = getUrl(req.path)
    if (newPath !== req.path) {
      const query = req.url.slice(req.path.length)
      const prefixUrl =
        process.env.NODE_ENV === "production" ? "https://" + req.hostname : ""
      return res.redirect(301, prefixUrl + newPath + query)
    }
  }

  next()
}

function oldCatalogUrls(req) {
  const paths = req.path.split("/").filter(Boolean)
  const len = paths.length - 1
  const replacedCategory = oldCategories[paths[len]]

  if (replacedCategory)
    return `/${paths.slice(0, len).join("/")}/${replacedCategory}/`
}

function getFullUrl(req, path) {
  const query = req.url.slice(req.path.length)
  const prefix =
    process.env.NODE_ENV === "production" ? "https://" + req.hostname : ""
  return prefix + path + query
}

export const redirectsAfterAuth = (req, res, next) => {
  // admin pages
  if (req.path.indexOf("/admin/") === 0) {
    // redirect if an user don't have access
    if (!(req.user && req.user.admin && req.user.accessList.length)) {
      const newUrl = getFullUrl(req, "/")
      return res.redirect(301, newUrl)
    }
  }

  next()
}
