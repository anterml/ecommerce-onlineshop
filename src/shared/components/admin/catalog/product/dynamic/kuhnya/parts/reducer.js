import A from "./constants"
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      const { category, dynamic } = action.response
      if (category === "kuhnya") return dynamic.parts

      return initialState
    }

    case A.create: {
      return state.concat(action.part)
    }

    case A.bulkCreate: {
      return state.concat(action.parts)
    }

    case A.change_baseField: {
      return state
    }

    case A.remove: {
      return state.filter(part => part !== action.part)
    }

    case A.change: {
      return state.map(part => (part !== action.part ? part : action.newPart))
    }

    default:
      return state
  }
}
