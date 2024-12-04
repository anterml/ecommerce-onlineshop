import asyncRequest from "utils/request"

export const addGroup = group => ({
  type: "admin/catalog/product/vars/groups/add",
  group,
})

export const removeGroup = group => ({
  type: "admin/catalog/product/vars/groups/remove",
  group,
})

export const changeGroup = (group, name, value) => ({
  type: "admin/catalog/product/vars/groups/change",
  group,
  name,
  value,
})

// вызывается в файле settings.js
export const swapGroup = (startGroup, endGroup) => ({
  type: "admin/catalog/product/vars/groups/swap",
  startGroup,
  endGroup,
})

export const addField = (name, field) => ({
  type: "admin/catalog/product/vars/groups/add_field",
  name,
  field,
})

export const addFields = (groupName, fields) => ({
  type: "admin/catalog/product/vars/groups/add_fields",
  groupName,
  fields,
})

export const removeField = id => ({
  type: "admin/catalog/product/vars/groups/remove_field",
  id,
})

export const removeFields = (groupName, fields) => ({
  type: "admin/catalog/product/vars/groups/remove_fields",
  groupName,
  fields,
})

export const changeField = (field, name, value) => ({
  type: "admin/catalog/product/vars/groups/change_field",
  field,
  name,
  value,
})

// вызывается в файле settings.js
export const swapField = (group, startField, endField) => ({
  type: "admin/catalog/product/vars/groups/swap_field",
  group,
  startField,
  endField,
})
