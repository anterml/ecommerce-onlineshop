export const remove = image => ({
  type: "admin/catalog/product/images/remove",
  image,
})

export const add = value => ({
  type: "admin/catalog/product/images/add",
  value,
})

export const swap = (from, to) => ({
  type: "admin/catalog/product/images/swap",
  from,
  to,
})
