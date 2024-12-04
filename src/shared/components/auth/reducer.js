const initialState = {
  status: null,
  isLogged: false,
  accessList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "auth/login": {
      const { username, _id, admin, restrict, accessList } = action.user
      return {
        status: "fulfilled",
        isLogged: true,
        username,
        userId: _id,
        admin,
        restrict,
        accessList: accessList || [],
      }
    }

    case "auth/logout":
      return initialState
  }

  return state
}
