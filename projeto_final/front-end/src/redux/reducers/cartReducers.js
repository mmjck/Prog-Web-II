import Types from "../types"


const initialState = {
    cart: [],
}

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
      case Types.ADD_PRODUCT:
          return {
              ...prevState,
              user: action.payload,
          }

      case Types.LOGOUT:
          return {
              ...prevState,
              user: null,
          }
      default:
          return prevState

  }
}

export default userReducer;
