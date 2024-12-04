const initialState = {
  _id: "",
  category: "",
  sections: [],
  doneStatus: "",
  revisionStatus: "",
  description: "",
  shortDescription: "",
  sliderDescription: "",
  creating: null,
  updating: null,
  collaboration: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      const product = Object.keys(initialState).reduce((acc, name) => {
        acc[name] = action.response[name]
        return acc
      }, {})
      product.department =
        product.category === "sp_phone" ? "electronics" : "mebel"
      product.preparePreviewDescription = preparePreviewDescription(
        action.response.description,
      )

      return product
    }

    case "admin/catalog/product/_general/change": {
      let { name, value } = action

      const newState = {
        ...state,
        [name]: value,
      }

      if (name === "description")
        newState.previewDescription = preparePreviewDescription(value)

      return newState
    }

    default:
      return state
  }
}

function preparePreviewDescription(text = "") {
  return text
    .replace(/\n/g, "<br />")
    .replace(/\/\/\*\*([^\*]+)\*\*\/\//g, "<em><strong>$1</strong></em>")
    .replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\/\/([^\/]+)\/\//g, "<em>$1</em>")
}
