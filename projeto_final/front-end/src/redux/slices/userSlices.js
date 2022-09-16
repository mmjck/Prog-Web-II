import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLogged: false,
}

const userSlice = createSlice({
    name: 'user' ,
    initialState: initialState,
    reducers: {
        login: (state, action) =>{
            console.log(action);
            return {
               ...state, 
                user: {...action.payload},
                isLogged : true,
            }
        },

        updateUser: (state, action) =>{
            console.log(action);
            return {
               ...state, 
                user: {...action.user},
            }
        },

        logout:(state) => initialState
    }
})

export const { login , logout, updateUser } = userSlice.actions
export default userSlice.reducer;