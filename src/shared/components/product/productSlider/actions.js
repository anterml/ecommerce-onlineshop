import asyncRequest from "utils/request"

export const fetch =
  (category, skip = 0) =>
  dispatch => {
    const params = {
      url: `product/product-slider/${category}?limit=9&skip=${skip}`,
    }

    return dispatch({
      types: [
        "product/productSlider/request",
        "product/productSlider/success",
        "product/productSlider/failure",
      ],
      callAPI: () => asyncRequest(params),
      payload: {
        category,
      },
    })
  }

export const setInitialState = () => ({
  type: "product/productSlider/set_initial-state",
})
