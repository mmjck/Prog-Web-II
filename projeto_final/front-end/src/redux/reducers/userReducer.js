import Types from "../types"
const initialState = {
    user: [],
    isLogged: false
  }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
      case Types.CHANGE_USER:
          return {
              ...state,
              user: action.payload,
              isLogged: true
          }

      case Types.LOGOUT:
          return {
              ...state,
              user: null,
              isLogged: false
          }
      default:
          return state

  }
}

export default userReducer;