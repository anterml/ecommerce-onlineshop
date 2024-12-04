const path = "admin/catalog/product/vars/settings/"

export const setDefaultField = (currId, prevId) => ({
  type: path + "set_default-field",
  currId,
  prevId,
})

export const changeInstock = value => ({
  type: path + "change_instock",
  value,
})

export const changeInstockPlaces = value => ({
  type: path + "change_instock-places",
  value,
})

export const changeAvailableVisibility = value => ({
  type: path + "change_available-visibility",
  value,
})

export const clearSelectedFields = () => ({
  type: path + "clear_selected-fields",
})
