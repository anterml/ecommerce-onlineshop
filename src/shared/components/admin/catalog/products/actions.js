import asyncRequest from "utils/request"

export default {
  fetchProducts(category, limit = 50, page = 1, doneStatus, brand) {
    if (category === "krovat_cherdak") category = "detskaya_krovat"

    const queries = []
    queries.push("limit=" + limit)
    queries.push("skip=" + (page * limit - limit))

    if (typeof doneStatus === "number") queries.push("doneStatus=" + doneStatus)
    if (brand) queries.push("brand=" + encodeURIComponent(brand))

    const params = {
      url: `admin/catalog/products/list/${category}?${queries.join("&")}`,
    }

    return asyncRequest(params)
  },

  fetchCategories() {
    const params = {
      url: "admin/catalog/products/filter/doneStatus",
    }

    return asyncRequest(params).then(data => {
      const category = {}
      data.forEach(({ _id, count }) => {
        if (!category[_id.category]) category[_id.category] = { total: 0 }
        category[_id.category][_id.doneStatus] = count
        category[_id.category].total += count
      })

      category.all = Object.keys(category).reduce((acc, name) => {
        Object.keys(category[name]).forEach(doneStatus => {
          if (!acc[doneStatus]) acc[doneStatus] = 0
          acc[doneStatus] += parseInt(category[name][doneStatus]) || 0
        })
        return acc
      }, {})

      return category
    })
  },

  fetchBrands() {
    const params = {
      url: "admin/catalog/products/filter/brands",
    }

    return asyncRequest(params).then(data => {
      const categories = {}
      const brands = {}

      data.forEach(({ _id, value }) => {
        categories[_id] = value.sort((a, b) => (a.name > b.name ? 1 : -1))
        const { name, count } = value

        value.forEach(({ name, count }) => {
          if (typeof brands[name] !== "number") brands[name] = 0
          brands[name] += count
        })
      })

      categories.all = Object.keys(brands)
        .sort()
        .map(name => ({
          name,
          count: brands[name],
        }))

      return categories
    })
  },
}
