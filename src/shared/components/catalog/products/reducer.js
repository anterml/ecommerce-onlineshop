import prettyPrice from "utils/prettyPrice"

const initialState = {
  initStatus: true,
  status: null,
  category: "",
  query: "not data",
  view: "grid",
  value: [],
  stats: {},
  limit: 20,
  page: 1,
  canLoadMore: false,
  count: 0,
  title: "",
  breadcrumbs: [],
  pageSection: 0,
  newCategory: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "catalog/products/request": {
      const {
        category,
        query,
        limit,
        calcCategoryCount,
        needAppend,
        pageSection,
      } = action.payload

      return {
        ...state,
        status: "pending",
        category,
        newCategory: state.category !== category,
        query,
        view: getView(query.view, state),
        limit,
        needAppend,
        initStatus: state.category !== category || !needAppend,
        calcCategoryCount,
        pageSection: pageSection || 0,
      }
    }

    case "catalog/products/success": {
      const count =
        (state.calcCategoryCount ? action.response.count : state.count) || 0
      let products = action.response.products.map(preparePrice)
      let canLoadMore = false

      const page = parseInt(action.payload.query.p) || 1
      // нужно ли показать кнопку "показать еще"
      if (products.length > state.limit) {
        products = products.slice(0, state.limit)
        canLoadMore = true
      }
      // добавить к уже существующим продуктам
      if (state.needAppend) products = state.value.concat(products)

      return {
        ...state,
        initStatus: false,
        status: "fulfilled",
        value: products,
        canLoadMore,
        count,
        page,
        title: action.response.title || "",
        breadcrumbs: action.response.breadcrumbs || [],
      }
    }

    case "catalog/products/failure": {
      return {
        ...state,
        status: "rejected",
        initStatus: false,
        error: action.error.message,
        count: 0,
        value: [],
      }
    }

    case "catalog/products/count_success": {
      return {
        ...state,
        stats: action.stats,
      }
    }

    case "catalog/products/change_view": {
      localStorage.setItem("product_view", JSON.stringify(action.value))

      return {
        ...state,
        view: action.value,
      }
    }

    default:
      return state
  }
}

function getView(view, state) {
  // если view указан, то рендерим с ним без разницы на сервере или клиенте
  if (view) return view

  // view не указан и это сервер, значит, рендерим по умолчанию
  if (typeof window === "undefined") return initialState.view

  // view не указан и это клиент, и это первое посещение этой страницы,
  // значит, попробуем применить предыдущий view из localStorage
  if (!state.status) {
    const localState = JSON.parse(localStorage.getItem("product_view"))
    return localState ? localState : initialState.view
  }

  // мы уже посещали эту страницу - берем view из state
  return state.view
}

function preparePrice(product) {
  const { price, oldPrice } = product.base

  product.prettyPrice = prettyPrice(price)

  if (oldPrice) product.prettyOldPrice = prettyPrice(oldPrice)

  if (!price) product.base.price = 0

  return product
}
