import asyncRequest from "utils/request"

export const create = value => ({
  type: "admin/catalog/product/vars/configurations/create",
  value,
})

export const addField = (configuration, fieldId) => ({
  type: "admin/catalog/product/vars/configurations/-FIELD_ADD---ADMIN",
  configuration,
  fieldId,
})

export const removeField = (configuration, fieldId) => ({
  type: "admin/catalog/product/vars/configurations/-FIELD_REMOVE---ADMIN",
  configuration,
  fieldId,
})

export const remove = configuration => ({
  type: "admin/catalog/product/vars/configurations/remove",
  configuration,
})

export const toggleFieldStatus = (configuration, fieldId, hideFields) => ({
  type: "admin/catalog/product/vars/configurations/toggle_field-status",
  configuration,
  fieldId,
  hideFields,
})

export const changeSecondaryField = (configuration, name, value) => ({
  type: "admin/catalog/product/vars/configurations/change_secondary-field",
  configuration,
  name,
  value,
})

export const changeMain = configuration => ({
  type: "admin/catalog/product/vars/configurations/-ITEM_CHANGE-MAIN---ADMIN",
  configuration,
})

export const toggleGroupStatus = (configuration, groupId) => ({
  type: "admin/product/vars/configurations/toggle_group-status",
  configuration,
  groupId,
})

export const save = (id, configurations, auth) => dispatch => {
  const params = {
    url: `api/admin/product2/${id}`,
    method: "put",
    data: {
      fields: {
        "vars.configurations": configurations,
        "authorOfUpdating": {
          name: auth.username,
          _id: auth.userId,
        },
      },
    },
  }

  return asyncRequest(params)
}
