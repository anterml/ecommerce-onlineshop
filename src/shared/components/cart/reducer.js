const initialState = {
  items: [],
  totalPrice: 0,
  transactionId: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "cart/fill_from_localstorage": {
      const cartData = localStorage.getItem("cart")

      const localState = cartData ? JSON.parse(cartData) : ""
      return localState && localState.items && localState.items.length
        ? localState
        : state
    }

    case "cart/add": {
      return prepareState([
        ...state.items,
        prepareProduct(action.product, action.options),
      ])
    }

    case "cart/remove": {
      return prepareState(
        state.items.filter(product => product !== action.product),
      )
    }

    case "cart/remove_by_productcode": {
      return prepareState(
        state.items.filter(
          product => product.productCode !== action.productCode,
        ),
      )
    }

    case "cart/remove_all": {
      return setLocalStorage(initialState)
    }

    case "cart/change_services": {
      const { oldProduct, newProduct } = action
      return prepareState(
        state.items.map(product =>
          product !== oldProduct ? product : newProduct,
        ),
      )
    }

    case "cart/change_count": {
      return prepareState(
        state.items.map(product =>
          product !== action.product
            ? product
            : { ...action.product, count: action.count },
        ),
      )
    }

    case "cart/clear": {
      return setLocalStorage({
        ...initialState,
      })
    }

    case "cart/set_transactionId": {
      return setLocalStorage({
        ...state,
        transactionId: action.transactionId,
      })
    }

    default:
      return state
  }
}

function prepareState(items) {
  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0)

  return setLocalStorage({
    items,
    totalPrice,
  })
}

function setLocalStorage(state) {
  if (typeof window !== "undefined")
    localStorage.setItem("cart", JSON.stringify(state))

  return state
}

function prepareProduct(product, options = {}) {
  const { base, category, _id } = product
  const { price, kind, urlName, name, productCode, imageFolder } = base
  const { configurationCode, image, count } = options
  const varFields = []
  const { groups, settings } = product.vars

  let wrongCC
  if (configurationCode) {
    const cc = configurationCode.split("-").map(value => parseInt(value) - 1)
    if (cc.length !== groups.length) wrongCC = true
    else {
      groups.forEach((group, i) => {
        const target = group.fields[cc[i]]
        if (cc[i] === -1 || !target) return

        varFields.push(target)
      })
    }
  }

  if (!configurationCode || wrongCC) {
    groups.forEach(group => {
      let defaultField = group.fields[0]

      for (let i = 0; i < group.fields.length; ++i) {
        if (settings.selectedFieldIds.indexOf(group.fields[i]._id) !== -1) {
          defaultField = group.fields[i]
          break
        }
      }

      if (defaultField) varFields.push(defaultField)
    })
  }

  const additionalData = {}
  let totalPrice = 0

  if (category === "kuhnya") {
    const parts = (product.parts || []).map(
      ({
        _id,
        properties,
        name,
        kind,
        dimension,
        code,
        price,
        totalPrice,
        countInset,
        fields,
      }) => ({
        _id,
        properties,
        name,
        kind,
        dimension,
        code,
        price,
        totalPrice,
        count: countInset || 1,
        fields,
      }),
    )
    //totalPrice = Number(parts.reduce((sum, part) => sum + part.totalPrice * part.count, 0)) || 0
    totalPrice = product.totalPrice
    additionalData.dynamic = { parts }
  } else {
    const basePrice = Number(price) || 0
    totalPrice =
      basePrice +
      varFields.reduce((sum, field) => sum + (Number(field.price) || 0), 0)
  }

  const _product = {
    productId: _id,
    name,
    urlName,
    category,
    kind,
    price,
    totalPrice,
    imageFolder,
    image: image || "1.jpg",
    count: count || 1,
    productCode,
    varFields,
    instock: typeof settings.instock === "number" ? settings.instock : -1,
    ...additionalData,
  }

  if (configurationCode) _product.configurationCode = configurationCode

  return _product
}
