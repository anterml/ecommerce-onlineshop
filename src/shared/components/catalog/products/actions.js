import asyncRequest from "utils/request"

export const fetch =
  ({ category, query, productOptions, Cookie, pageSection }) =>
  dispatch => {
    query = query || {}
    const limit = query.limit || 20
    const page = query.p || 1
    const pages = (page - 1) * 60
    const skip = pages + (pageSection || 0) * limit
    const q = []

    for (let name in query) {
      if (name !== "limit" && name !== "page" && name !== "p")
        q.push(encodeURIComponent(name) + "=" + encodeURIComponent(query[name]))
    }

    q.push("limit=" + limit)
    q.push("skip=" + skip)

    const { dontCalcCategoryCount, needAppend } = productOptions || {}
    if (!dontCalcCategoryCount) q.push("calcCategoryCount=1")

    const params = {
      url: `catalog/products3/${category}?${q.join("&")}`,
    }

    if (Cookie) params.headers = { Cookie }

    return dispatch({
      types: [
        "catalog/products/request",
        "catalog/products/success",
        "catalog/products/failure",
      ],
      callAPI: () => asyncRequest(params),
      payload: {
        category,
        query,
        limit,
        calcCategoryCount: !dontCalcCategoryCount,
        needAppend,
        pageSection,
      },
    })
  }

export const changeView = value => ({
  type: "catalog/products/change_view",
  value,
})
