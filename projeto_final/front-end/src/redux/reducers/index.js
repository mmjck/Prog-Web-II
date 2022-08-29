import { combineReducers } from "redux";


import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  userData: userReducer,
  shopingCart: cartReducer
});

export default allReducers;