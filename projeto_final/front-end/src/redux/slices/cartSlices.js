import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    totalValue: 0,
}


const atualizaValorTotal = (arr) => {
    var result = arr.reduce((acc, obj) => {
        console.log(acc, obj);
        return acc + obj.quantity * parseFloat(obj.preco)
    }, 0);
    return result
}

const atualizaCarrinho = (state, finded, total) => {
    return state.cart.map(item => {
        if (item.id === finded.id) {
            return {
                ...item,
                quantity: total
            }
        }
        return item
    });
}

const shopingCartSlice = createSlice({
    name: 'shopingCart',
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const {produto, total} = action.payload;
            const finded = state.cart.find(item => item.id === produto.id)

            if (finded) {
                const cart = atualizaCarrinho();
                return {
                    ...state,
                    cart: cart,
                    totalValue: atualizaValorTotal(cart)
                }
            }

            const cart = [...state.cart, {...produto, quantity: total}]
            return {
                ...state,
                totalValue: atualizaValorTotal(cart),
                cart: [ ...cart]
            };
        },
        removeProductFromCart: (state, action) => {
            const newCart = state.cart.filter(element => element.id !== action.product.id)
            return {
                ...state,
                cart: newCart,
                totalValue: atualizaValorTotal(state)
            }
        },

        incrementQuantity: (state, action) => {
            const arr = current(state).cart;
            const findIndex = arr.findIndex(item => item.id === action.payload)

            const value = arr[findIndex]
            const q = value.quantity + 1 

            const newArr = arr.map(item => {
                if(item.id === action.payload )  {
                return { 
                ...value, quantity: q}
                }
                    return item;
            });

            return {
                ...current(state),
                cart: [...newArr],
                totalValue: atualizaValorTotal(newArr)
            }
        },
        decrementQuantity: (state, action) => {
            const arr = current(state).cart;
            const findIndex = arr.findIndex(item => item.id === action.payload)
           
            const value = arr[findIndex]
            let q =0;


            if(arr[findIndex].quantity >= 1){
                q =  value.quantity - 1
            }else {
                q =  0
            }
            const newArr = arr.map(item => {
                if(item.id === action.payload )  {
                return { 
                ...value, quantity: q}
                }
                    return item;
            });
            return {
                ...current(state),
                cart: [...newArr],
                totalValue: atualizaValorTotal(newArr)
            }
        },
        clearCart: (state) => initialState

    }
})

export const { clearCart, removeProductFromCart, addProductToCart, incrementQuantity, decrementQuantity } = shopingCartSlice.actions
export default shopingCartSlice.reducer;