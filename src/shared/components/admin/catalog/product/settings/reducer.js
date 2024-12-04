const initialState = {
  sortPriority: 500,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.settings || state
    }

    case "admin/catalog/product/settings/change": {
      return {
        ...state,
        [action.name]: action.value,
      }
    }

    default:
      return state
  }
}
