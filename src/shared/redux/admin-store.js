import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import reducers from "./admin-reducers"

export default initialState => {
  // Redux middleware
  const middleware = [thunkMiddleware, callAPIMiddleware]

  // Development enhancers
  const enhancers = []
  let composeEnhancers = compose

  if (process.env.NODE_ENV === "development" && typeof window === "object") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  )

  // Hot reload
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./admin-reducers", () =>
      store.replaceReducer(require("./admin-reducers").default),
    )
  }

  return store
}

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload } = action

    if (!types) {
      // Normal action: pass it on
      if (typeof window === "undefined") console.info("action", action.type)
      else console.info("action", action)
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.")
    }

    if (typeof callAPI !== "function") {
      throw new Error("Expected fetch to be a function.")
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch({ type: requestType, payload })

    return callAPI().then(
      response => dispatch({ type: successType, payload, response }),
      error => dispatch({ type: failureType, payload, error }),
    )
  }
}
