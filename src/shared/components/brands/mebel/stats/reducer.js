const initialState = {
  status: null,
  values: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "brands/request": {
      return {
        ...state,
        status: "pending",
      }
    }

    case "brands/success": {
      return {
        status: "fulfilled",
        values: Array.isArray(action.response) ? action.response : state.values,
      }
    }

    case "brands/failure": {
      return {
        status: "rejected",
        error: action.error.message,
      }
    }

    default:
      return state
  }
}
