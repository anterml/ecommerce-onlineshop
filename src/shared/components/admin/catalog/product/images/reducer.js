const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.images || state
    }

    case "admin/catalog/product/images/add": {
      return [...state, action.value]
    }

    case "admin/catalog/product/images/remove": {
      return state.filter(image => image !== action.image)
    }

    case "admin/catalog/product/images/swap": {
      const { from, to } = action

      const list = state.slice()
      // cut the element at index 'from'
      const cutOut = list.splice(from, 1)[0]
      // insert it at index 'to'
      list.splice(to, 0, cutOut)
      return list
    }

    default:
      return state
  }
}
