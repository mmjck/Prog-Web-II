import { configureStore } from '@reduxjs/toolkit'
// import userReducer from '../reducers/userReducer'
// import cartReducer from '../reducers/cartReducer'
  import allReducers from '../reducers';



const initialState = {
  user: null,
  isLogged: false,
  cart: []
};


const store = configureStore({
  reducer: allReducers
  ,
   preloadedState: initialState
})


console.log( store.getState());
export default store;