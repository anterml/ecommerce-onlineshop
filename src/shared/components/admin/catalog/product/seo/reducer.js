const initialState = {
  descriptionTemplateId: "",
  descriptionText: "",
  metaDescriptionText: "",
  metaDescriptionKind: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.seo || initialState
    }

    case "admin/catalog/product/seo/change": {
      return {
        ...state,
        [action.name]: action.value,
      }
    }

    default:
      return state
  }
}
