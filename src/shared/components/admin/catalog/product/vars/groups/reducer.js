const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "admin/catalog/product/success": {
      return action.response.vars.groups || state
    }
    case "admin/catalog/product/vars/groups/add": {
      return [...state, action.group]
    }

    case "admin/catalog/product/vars/groups/change": {
      const { group, name, value } = action

      return state.map(g => {
        if (g !== group) return g

        const newGroup = {
          ...group,
          [name]: value,
        }

        // Если изменилось название группы,
        // тогда так же меняем и названия всех полей в этой группе.
        if (name === "name") {
          newGroup.fields = g.fields.map(field => ({ ...field, name: value }))
        }

        return newGroup
      })
    }

    case "admin/catalog/product/vars/groups/add_field": {
      return state.map(group =>
        group.name !== action.name
          ? group
          : {
              ...group,
              fields: [...group.fields, action.field],
            },
      )
    }

    case "admin/catalog/product/vars/groups/add_fields": {
      return state.map(group =>
        group.name !== action.groupName
          ? group
          : {
              ...group,
              fields: group.fields.concat(action.fields),
            },
      )
    }

    case "admin/catalog/product/vars/groups/remove_field": {
      return state.map(group =>
        !group.fields.map(f => f._id).includes(action.id)
          ? group
          : {
              ...group,
              fields: group.fields.filter(f => f._id !== action.id),
            },
      )
    }

    case "admin/catalog/product/vars/groups/remove_fields": {
      return state.map(group =>
        group.name !== action.groupName
          ? group
          : {
              ...group,
              fields: group.fields.filter(
                field => !action.fields.find(target => target === field),
              ),
            },
      )
    }

    case "admin/catalog/product/vars/groups/change_field": {
      return state.map(group =>
        !group.fields.includes(action.field)
          ? group
          : {
              ...group,
              fields: group.fields.map(field =>
                field !== action.field
                  ? field
                  : {
                      ...field,
                      [action.name]: action.value,
                    },
              ),
            },
      )
    }

    case "admin/catalog/product/vars/groups/remove": {
      return state.filter(group => group !== action.group)
    }

    case "admin/catalog/product/vars/groups/swap": {
      const { startGroup, endGroup } = action

      const groups = []
      for (let i = 0; i < state.length; ++i) {
        const group = state[i]
        if (group === startGroup) continue

        if (group === endGroup) groups.push(startGroup)
        groups.push(group)
      }

      // вставляем в самый конец если нужно
      if (endGroup === "last") groups.push(startGroup)

      return groups
    }

    case "admin/catalog/product/vars/groups/swap_field": {
      const { group, startField, endField } = action

      const fields = []
      for (let i = 0; i < group.fields.length; ++i) {
        const field = group.fields[i]
        if (field === startField) continue

        if (field === endField) fields.push(startField)
        fields.push(field)
      }

      // вставляем в самый конец если нужно
      if (endField === "last") {
        fields.push(startField)
      }

      return state.map(g => (g !== group ? g : { ...group, fields }))
    }

    default:
      return state
  }
}
