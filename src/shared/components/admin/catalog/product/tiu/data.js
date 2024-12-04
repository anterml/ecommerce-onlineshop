const GROUP_SEPARATOR = " | "
const FIELD_SEPARATOR = " * "

const getVariant = ({ name, value, price }) =>
  name + FIELD_SEPARATOR + value + (price ? FIELD_SEPARATOR + price : "")

function prepare(vars) {
  const { groups, configurations } = vars
  // id's mapping
  const varFieldsById = setFieldsById(groups)
  const [indexes, fieldIds] = getFieldIds(vars, varFieldsById)
  const [flatedIds] = findConfigurations(configurations, groups, varFieldsById)

  const results = {}
  fieldIds.forEach((line, i) => {
    const exclude = flatedIds.some(ignoreLine => {
      const ids = ignoreLine.split(GROUP_SEPARATOR)
      return ids.every(id => line.includes(id))
    })

    if (!exclude) {
      results[indexes[i]] = line.map(id => varFieldsById[id])
    }
  })

  return results
}

function setFieldsById(groups) {
  const varFieldsById = {}
  groups.forEach(group => {
    group.fields.forEach(field => (varFieldsById[field._id] = field))
  })
  return varFieldsById
}

function getFieldIds(vars, varFieldsById) {
  const groups = vars.groups.slice()

  if (!groups.length) return

  let fieldIds = groups.shift().fields.map(field => [field._id])
  let indexes = fieldIds.map((v, i) => String(i + 1))
  let next = {}

  while ((next = groups.shift())) {
    let { fields } = next
    let tempFieldIds = []
    let tempIndexes = []

    if (next.name === "Вид принта") {
      const fieldPos = getDefaultFieldPos(next, vars, varFieldsById)
      for (let i = 0; i < fieldIds.length; ++i) {
        tempIndexes.push(indexes[i] + "-" + fieldPos)
      }
    } else {
      for (let i = 0; i < fieldIds.length; ++i) {
        for (let k = 0; k < fields.length; ++k) {
          const { name, value, price, _id } = fields[k]
          tempIndexes.push(indexes[i] + "-" + (k + 1))
          tempFieldIds.push(fieldIds[i].slice().concat(_id))
        }
      }
    }

    indexes = tempIndexes
    if (tempFieldIds.length) fieldIds = tempFieldIds
  }

  return [indexes, fieldIds]
}

function getDefaultFieldPos(group, vars, varFieldsById) {
  const { selectedFieldIds } = vars.settings
  let targetField

  for (let i = 0; i < selectedFieldIds.length; ++i) {
    const field = varFieldsById[selectedFieldIds[i]]
    if (field && field.name === group.name) {
      targetField = field
      break
    }
  }

  return targetField ? group.fields.indexOf(targetField) + 1 || 1 : 1
}

function findConfigurations(configurations, groups, varFieldsById) {
  const confs = configurations.filter(conf => conf.skipFieldIds.length)
  const flatedIds = []

  const result = confs.map(conf => {
    const buff = []
    const result = {}
    const fields = conf.fieldIds.concat(conf.skipFieldIds)
    const unfoldedIds = unfold(groups, fields, varFieldsById)
    flatedIds.push.apply(flatedIds, flat(unfoldedIds))
    fields.forEach(id => {
      const field = varFieldsById[id]
      if (field) {
        buff.push(getVariant(field))
      }
    })

    return buff
  })

  return [flatedIds]
}

function unfold(groups, fieldIds, varFieldsById) {
  const ids = {}
  fieldIds.forEach(id => {
    const field = varFieldsById[id]
    const group = groups.find(group => group.name === field.name)
    const groupIndex = groups.indexOf(group)
    if (group) {
      if (Array.isArray(ids[groupIndex])) {
        ids[groupIndex].push(field._id)
      } else {
        ids[groupIndex] = [field._id]
      }
    } else console.log("Group not found")
  })
  return ids
}

function flat(ids) {
  function _flat(list) {
    if (list.length < 2) return list

    const buff = []
    const [first, second] = list.slice(0, 2)

    for (let i = 0; i < first.length; ++i) {
      for (let k = 0; k < second.length; ++k) {
        buff.push(first[i] + GROUP_SEPARATOR + second[k])
      }
    }
    var a = _flat([buff, ...list.slice(2)])
    return _flat([buff, ...list.slice(2)])
  }

  return _flat(Object.keys(ids).map(confCode => ids[confCode]))[0]
}

export default prepare
