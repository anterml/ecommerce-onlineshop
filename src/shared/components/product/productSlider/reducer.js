import prettyPrice from "utils/prettyPrice"

const initialState = {
  status: null,
  category: "",
  value: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "product/productSlider/request": {
      return {
        ...state,
        status: "pending",
      }
    }

    case "product/productSlider/success": {
      const { category } = action.payload

      const value =
        state.category !== category
          ? prepare(action.response, category)
          : state.value.concat(prepare(action.response, category))

      return {
        status: "fulfilled",
        value,
        category,
      }
    }

    case "product/productSlider/failure": {
      return {
        status: "rejected",
        error: action.error.message,
        value: [],
      }
    }

    case "product/productSlider/set_initial-state": {
      return initialState
    }

    // обновить слайдер при изменении ревизии
    case "product/change_revision-status": {
      return {
        ...state,
        value: state.value.map(product =>
          product._id !== action.productId
            ? product
            : {
                ...product,
                revisionStatus: action.revisionStatus,
              },
        ),
      }
    }

    default:
      return state
  }
}

const ROOT_IMAGE_URL = "shop/category"

function prepare(products, category) {
  const departmentUrl = category === "sp_phone" ? "electronics" : "furniture"
  products.forEach(product => {
    product.prettyPrice = prettyPrice(product.base.price)
    product.department = category === "sp_phone" ? "electronics" : "mebel"
    product.image = {
      backgroundImage: `url(${ROOT_IMAGE_URL}/${departmentUrl}/${category}/${product.base.imageFolder}/1.jpg)`,
    }
  })
  return products
}
