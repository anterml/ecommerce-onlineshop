const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.vars.configurations || state
    }

    case "admin/catalog/product/vars/configurations/create": {
      return [...state, action.value]
    }

    case "admin/catalog/product/vars/configurations/remove": {
      return state.filter(
        configuration => configuration !== action.configuration,
      )
    }

    case "admin/catalog/product/vars/configurations/toggle_field-status": {
      const { fieldId, hideFields } = action

      return state.map(configuration => {
        if (configuration !== action.configuration) return configuration

        if (!hideFields) {
          // меняем красное на серое
          if (configuration.fieldIds.indexOf(fieldId) !== -1) {
            return {
              ...configuration,
              fieldIds: configuration.fieldIds.filter(id => id !== fieldId),
              skipFieldIds: [...configuration.skipFieldIds, fieldId],
            }
          }

          // меняем серое на черное
          if (configuration.skipFieldIds.indexOf(fieldId) !== -1) {
            return {
              ...configuration,
              skipFieldIds: configuration.skipFieldIds.filter(
                id => id !== fieldId,
              ),
            }
          }

          // меняем черное на красное
          return {
            ...configuration,
            fieldIds: [...configuration.fieldIds, fieldId],
          }
        } else {
          // меняем красное на голубое
          if (configuration.fieldIds.indexOf(fieldId) !== -1) {
            return {
              ...configuration,
              fieldIds: configuration.fieldIds.filter(id => id !== fieldId),
              includeFieldIds: [...configuration.includeFieldIds, fieldId],
            }
          }

          // меняем голубое на оранжевое
          if (configuration.includeFieldIds.indexOf(fieldId) !== -1) {
            return {
              ...configuration,
              includeFieldIds: configuration.includeFieldIds.filter(
                id => id !== fieldId,
              ),
            }
          }

          // меняем оранжевое на красное
          return {
            ...configuration,
            fieldIds: [...configuration.fieldIds, fieldId],
          }
        }
      })
    }

    case "admin/catalog/product/vars/configurations/-ITEM_CHANGE-MAIN---ADMIN": {
      return state.map(configuration => {
        if (configuration.main && configuration !== action.configuration) {
          return {
            ...configuration,
            main: false,
          }
        }

        if (configuration === action.configuration) {
          return {
            ...configuration,
            main: true,
          }
        }

        return configuration
      })
    }

    case "admin/catalog/product/vars/configurations/change_secondary-field": {
      return state.map(configuration =>
        configuration !== action.configuration
          ? configuration
          : {
              ...configuration,
              [action.name]: action.value,
            },
      )
    }

    case "admin/catalog/product/vars/configurations/-FIELD_ADD---ADMIN": {
      return state.map(configuration =>
        configuration !== action.configuration
          ? configuration
          : {
              ...configuration,
              fieldIds: [...configuration.fieldIds, action.fieldId],
            },
      )
    }

    case "admin/catalog/product/vars/configurations/-FIELD_REMOVE---ADMIN": {
      return state.map(configuration =>
        configuration !== action.configuration
          ? configuration
          : {
              ...configuration,
              fieldIds: configuration.fieldIds.filter(
                _id => _id !== action.fieldId,
              ),
            },
      )
    }

    case "admin/product/vars/configurations/toggle_group-status": {
      return state.map(configuration => {
        const { groupId } = action

        if (!groupId || configuration !== action.configuration)
          return configuration

        const skipGroupIds = configuration.skipGroupIds || []
        return {
          ...configuration,
          skipGroupIds:
            skipGroupIds.indexOf(groupId) === -1
              ? [...skipGroupIds, groupId]
              : skipGroupIds.filter(id => id !== groupId),
        }
      })
    }

    default:
      return state
  }
}
