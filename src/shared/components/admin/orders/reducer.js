const prefixUrl = "admin/orders/listing/"

const initialState = {
  status: null,
  items: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case prefixUrl + "request": {
      return {
        ...state,
        status: "pending",
      }
    }

    case prefixUrl + "success": {
      return {
        ...state,
        status: "fulfilled",
        items: action.response,
      }
    }

    case prefixUrl + "failure": {
      return {
        ...state,
        status: "rejected",
        error: action.error.message,
      }
    }

    default:
      return state
  }
}
