import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'


const store = configureStore({
  reducer: {
    userData: userReducer,
  }
})


store.getState();
export default store;