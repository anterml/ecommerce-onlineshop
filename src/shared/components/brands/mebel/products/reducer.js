const initialState = {
  status: null,
  page: 0,
  brand: null,
  values: [],
}

const url = "brands/products"

export default (state = initialState, action) => {
  switch (action.type) {
    case `${url}/request`: {
      const { brand, page } = action.payload
      return {
        ...state,
        brand,
        page,
        status: "pending",
      }
    }

    case `${url}/success`: {
      const { products, canLoadMore } = action.response
      const needAppend = action.payload && action.payload.page > 0

      const values = needAppend ? state.values.concat(products) : products

      return {
        ...state,
        status: "fulfilled",
        canLoadMore,
        values,
      }
    }

    case `${url}/failure`: {
      return {
        ...state,
        status: "rejected",
        canLoadMore: false,
        error: action.error.message,
      }
    }

    case `${url}/reset`: {
      return {
        status: null,
        values: [],
      }
    }

    default:
      return state
  }
}
