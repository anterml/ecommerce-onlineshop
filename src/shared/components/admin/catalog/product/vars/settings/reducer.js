const initialState = {
  selectedFieldIds: [],
  instock: -1,
  availableVisibility: false,
  instockPlaces: [],
}

const path = "admin/catalog/product/vars/settings/"
export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.vars.settings || initialState
    }

    case path + "set_default-field": {
      const { currId, prevId } = action
      let selectedFieldIds
      // удаляем
      if (currId === prevId)
        selectedFieldIds = state.selectedFieldIds.filter(id => id !== currId)
      // удаляем старое и добавляем новое поля
      else if (prevId)
        selectedFieldIds = [
          ...state.selectedFieldIds.filter(id => id !== prevId),
          currId,
        ]
      // добавляем
      else selectedFieldIds = [...state.selectedFieldIds, currId]

      return {
        ...state,
        selectedFieldIds,
      }
    }

    case path + "change_instock": {
      return {
        ...state,
        instock: action.value,
      }
    }

    case path + "change_instock-places": {
      return {
        ...state,
        instockPlaces: action.value,
      }
    }

    case path + "change_available-visibility": {
      return {
        ...state,
        availableVisibility: action.value,
      }
    }

    case path + "clear_selected-fields": {
      return {
        ...state,
        selectedFieldIds: [],
      }
    }

    default:
      return state
  }
}
