const path = "admin/catalog/product/dynamic/parts/"

const actions = ["create", "bulkCreate", "change_baseField", "remove", "change"]

export default actions.reduce((acc, value) => {
  acc[value] = path + value
  return acc
}, {})
