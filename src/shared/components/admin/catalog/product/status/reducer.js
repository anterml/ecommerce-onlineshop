const initialState = {
  value: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/request": {
      return {
        value: "pending",
      }
    }

    case "admin/catalog/product/success": {
      return {
        value: "fulfilled",
      }
    }

    case "admin/catalog/product/failure": {
      return action.error.status === 404
        ? { value: "404" }
        : { value: "rejected", error: action.error.message }
    }

    case "PRODUCT_PREPARE_NEW": {
      return {
        value: "fulfilled",
      }
    }
    default:
      return state
  }
}
