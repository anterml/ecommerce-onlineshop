export default (state = false, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      const { category, dynamic } = action.response
      if (category === "kuhnya") return !!dynamic.isTemplate

      return false
    }

    case "admin/catalog/product/dynamic/toggle_template": {
      return action.value
    }

    default:
      return state
  }
}
