import Types from "../types"


const initialState = {
    user: null,
    isLogged: false
}

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
      case Types.CHANGE_USER:
          return {
              ...prevState,
              user: action.payload,
              isLogged: true
          }

      case Types.LOGOUT:
          return {
              ...prevState,
              user: null,
              isLogged: false
          }
      default:
          return prevState

  }
}

export default userReducer;

// import { createSlice } from '@reduxjs/toolkit'
// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         user: null,
//         isLogged: false
//     },
//     reducers: {
//         changeUser(state, action) {
//             console.log("actions", action);
//             state.value =
//             {
//                 user: { ...action.payload },
//                 isLogged: true,
//             }
//             console.log( state)
//         },
//         logout(state, action) {
//             state.value =
//             {
//                 user: null,
//                 isLogged: false,
//             }
//         }
//     }
// })

// export const { logout, changeUser } = userSlice.actions
// export default userSlice.reducer