const initialState = {
  kind: "",
  name: "",
  urlName: "",
  imageFolder: "",
  article: "",
  price: "",
  oldPrice: "",
  productCode: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.base || state
    }

    case "admin/catalog/product/base/change": {
      const { name, value } = action

      const newState = {
        ...state,
        [name]: value,
      }

      return newState
    }

    default:
      return state
  }
}
