const initialState = []
const path = "admin/catalog/product/"
const reducerName = "attrs"

const reducer =
  reducerName =>
  (state = [], action) => {
    const rpath = path + reducerName + "/"
    switch (action.type) {
      case path + "success": {
        return action.response[reducerName] || state
      }

      case rpath + "change": {
        return state.map(value =>
          value !== action.oldValue ? value : action.newValue,
        )
      }

      case rpath + "removeByIndex": {
        return state.filter(({ name }) => name !== action.name)
      }

      case rpath + "remove": {
        return state.filter(attr => attr !== action.attr)
      }

      case rpath + "add": {
        return [...state, action.attr]
      }

      case rpath + "toggle-all": {
        const { actionName, name, fields } = action
        const values = state.filter(f => f.name !== name)

        return actionName === "select" ? values.concat(fields) : values
      }

      default:
        return state
    }
  }

export const sattrs = reducer("sattrs")
export const attrs = reducer("attrs")
