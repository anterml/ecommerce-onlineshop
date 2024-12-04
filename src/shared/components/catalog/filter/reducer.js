import PRIORITY_LIST from "./priority-list"

const initialState = {
  status: "",
  value: [],
  category: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "catalog/filter/request": {
      return {
        ...state,
        status: "pending",
        category: action.payload.category,
      }
    }

    case "catalog/filter/success": {
      if (!Array.isArray(action.response)) {
        return {
          ...state,
          status: "rejected",
          error: action.error.message,
        }
      }

      const priorityList = [
        "Цвет",
        ...(PRIORITY_LIST[state.category] || []),
        "Бренд",
        "Страна производитель",
      ]

      for (let i = 0; i < action.response.length; ++i) {
        const attrs = action.response[i]
        attrs.field = ""

        // поля, которые будут свернуты
        if (priorityList.indexOf(attrs._id) === -1) attrs.isCollapse = true

        if (attrs._id === "Назначение" || attrs._id === "Размещение") {
          const wildcard = attrs.value.filter(attr => attr.name === "*")[0]
          if (!wildcard) continue

          const value = attrs.value.filter(attr => attr.name !== "*")

          value.forEach(attr => {
            attr.count += wildcard.count
          })

          attrs.value = value
        } else if (attrs.value[0] && typeof attrs.value[0].name === "object") {
          const target = attrs.value[0].name

          // Спальные места, размеры и т.п.
          if ("width" in target || "length" in target || "height" in target) {
            attrs.value.forEach(attr => {
              const value = attr.name

              if (value.length && value.width && value.height) {
                attr.name =
                  value.length + " x " + value.width + " x " + value.height
                attrs.field = "ss-lwh"
              } else if (value.width && value.height) {
                attr.name = value.width + " x " + value.height
                attrs.field = "ss-wh"
              } else if (value.length && value.width) {
                attr.name = value.length + " x " + value.width
                attrs.field = "ss-lw"
              } else attr.name = "na"
            })

            // объединить похожие значния, пример:
            // { width: 160, height: 200 } и { height: 200, width: 160 }
            if (attrs.field) {
              const buff = {}
              attrs.value.forEach(attr => {
                if (!buff[attr.name]) {
                  buff[attr.name] = { ...attr }
                } else {
                  buff[attr.name].count += attr.count
                }
              })

              attrs.value = Object.values(buff)
            }
          }
        }
      }

      return {
        ...state,
        status: "fulfilled",
        value: sortByName(sortByCount(action.response), priorityList),
      }
    }

    case "catalog/filter/failure": {
      return {
        ...state,
        status: "rejected",
        error: action.error.message,
      }
    }

    default:
      return state
  }
}

function sortByCount(values) {
  return values.map(attr => {
    const firstValue = attr.value[0] || {}
    const number = Number(firstValue.name)
    const sortFn =
      typeof number === "number" && !Number.isNaN(number)
        ? (a, b) => a.name - b.name
        : (a, b) => b.count - a.count

    return {
      ...attr,
      _id: attr._id,
      value: attr.value.sort(sortFn),
    }
  })
}

function sortByName(values, priorityList) {
  if (!priorityList || !Array.isArray(priorityList)) return values

  return values.sort((a, b) => {
    const posA = priorityList.indexOf(a._id)
    const posB = priorityList.indexOf(b._id)

    if (posA === -1) return 1

    if (posB === -1) return -1

    return posA <= posB ? -1 : 1
  })
}
