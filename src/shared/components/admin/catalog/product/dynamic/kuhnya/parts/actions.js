import A from "./constants"

export const create = part => ({
  type: A.create,
  part,
})

export const bulkCreate = parts => ({
  type: A.bulkCreate,
  parts,
})

export const change = (part, newPart) => ({
  type: A.change,
  part,
  newPart,
})

export const removePart = part => ({
  type: A.remove,
  part,
})
