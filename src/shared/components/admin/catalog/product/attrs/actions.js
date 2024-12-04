import asyncRequest from "utils/request"
const path = "admin/catalog/product/"

const actions = reducerName => {
  const rpath = path + reducerName + "/"
  return {
    change: (oldValue, newValue) => ({
      type: rpath + "change",
      oldValue,
      newValue,
    }),

    remove: attr => ({
      type: rpath + "remove",
      attr,
    }),

    removeByIndex: name => ({
      type: rpath + "removeByIndex",
      name,
    }),

    add: attr => ({
      type: rpath + "add",
      attr,
    }),

    toggleAll: props => ({
      ...props,
      type: rpath + "toggle-all",
    }),
  }
}

export const AttrActions = actions("attrs")
export const SAttrActions = actions("sattrs")
