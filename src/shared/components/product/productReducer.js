const initialState = {
  status: null,
  error: null,
  // имя последнего продукта, который не получилось загрузить
  errorUrlName: null,
  value: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "product/request": {
      return {
        ...state,
        error: null,
        errorUrlName: null,
        status: "pending",
      }
    }

    case "product/success": {
      return {
        ...state,
        error: null,
        status: "fulfilled",
        value: prepare(action.response),
      }
    }

    case "product/failure": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
        errorUrlName: action.payload.urlName,
        value: {},
      }
    }

    case "product/change_revision-status": {
      return {
        ...state,
        value: {
          ...state.value,
          revisionStatus: action.revisionStatus,
        },
      }
    }

    case "product/set_initial-state": {
      return initialState
    }

    case "product/toggle_part": {
      const product = {
        ...state.value,
      }

      product.dynamic = {
        ...product.dynamic,
        parts: product.dynamic.parts.map(part =>
          part.code !== action.code
            ? part
            : {
                ...part,
                inset: !part.inset,
              },
        ),
      }

      return {
        ...state,
        value: product,
      }
    }

    case "product/change_part-count-inset": {
      const target = state.value.dynamic.parts.find(
        part => part.code === action.code,
      )
      if (!target) return state

      let countInset = Number(target.countInset) || 1
      countInset += action.value === "dec" ? -1 : 1

      if (countInset < 1) return state

      const product = {
        ...state.value,
      }

      product.dynamic = {
        ...product.dynamic,
        parts: product.dynamic.parts.map(part =>
          part.code !== action.code ? part : { ...part, countInset },
        ),
      }

      return {
        ...state,
        value: product,
      }
    }

    default:
      return state
  }
}

function prepare(product) {
  const { base, category, vars, images } = product
  product.warranty = (
    product.sattrs.find(attr => attr.name === "Гарантия") || {}
  ).value
  product.attrDetails = getAttrDetails(product.attrs)
  // fix if there is no images
  if (!Array.isArray(images) || !images.length) product.images = ["1.jpg"]

  trimImageUrl(vars)
  prepareVP(vars.groups, base.imageFolder, category)

  if (category === "kuhnya") {
    prepareKuhnyaParts(product)
  }
  return product
}

function getAttrDetails(attrs) {
  const skipNames = ["Размещение", "Назначение", "Стиль"]
  const startWithNames = ["Размер", "Цвет", "Спальн"]
  const details = []

  for (let i = 0; i < attrs.length; ++i) {
    const { name, value } = attrs[i]

    if (
      skipNames.includes(name) ||
      startWithNames.find(v => name.indexOf(v) === 0) ||
      !(typeof value === "string" || typeof value === "number")
    )
      continue

    const detail = details.find(detail => detail.name === name)
    if (detail) detail.value += ", " + value
    else details.push({ name, value })
  }

  return details
}

function prepareKuhnyaParts(product) {
  if (product && product.dynamic && Array.isArray(product.dynamic.parts)) {
    const ROOT_IMAGE_URL = "shop/category/furniture/kuhnya/"
    const { base, dynamic } = product
    // основной путь к картинкам
    dynamic.parts.forEach(part => {
      const { imageFolder } = part.clone ? part.clone : base
      part.fullImageUrl =
        ROOT_IMAGE_URL + imageFolder + "/m/" + part.imageFolder + "/"
    })
  }
}

function prepareVP(groups, imageFolder, category) {
  const rootImageUrl = "shop"
  for (let i = 0; i < groups.length; ++i) {
    const { name, fields } = groups[i]
    if (name === "Вид принта") {
      fields.forEach(f => {
        const style = {
          backgroundImage: f.fabric
            ? `url("${rootImageUrl}/textures/printviews/${f.fabric}/${f.value}")`
            : `url("${rootImageUrl}/category/furniture/${category}/${imageFolder}/vp/${f.value}")`,
        }

        if (
          f.backgroundSize &&
          /^(cover|contain|auto)$/i.test(f.backgroundSize)
        )
          style.backgroundSize = f.backgroundSize

        f.styles = [style]
      })
    } else if (name.indexOf("Цвет") === 0) {
      fields.forEach(f => {
        f.styles = f.styles.map(({ hex, image, backgroundSize }) => {
          const style = {}
          if (hex) style.backgroundColor = hex
          if (backgroundSize) style.backgroundSize = backgroundSize
          if (image)
            style.backgroundImage = `url("${rootImageUrl}/textures/material/${image}")`
          return style
        })
      })
    }
  }
}

function trimImageUrl({ configurations, groups }) {
  // убираем лишние пробелы в полях
  for (let i = 0; i < groups.length; ++i) {
    groups[i].fields.forEach(field => {
      if (typeof field.imageUrl === "string")
        field.imageUrl = field.imageUrl.trim()
    })
  }

  // убираем лишние пробелы в конфигурациях
  configurations.forEach(configuration => {
    if (typeof configuration.imageUrl === "string")
      configuration.imageUrl = configuration.imageUrl.trim()
  })
}
