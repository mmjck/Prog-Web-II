import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../slices/userSlices"
 import cartSlice from "../slices/cartSlices"
export default configureStore({
  reducer: {
    user: userSlice,
    shopingCart: cartSlice 
  }
})