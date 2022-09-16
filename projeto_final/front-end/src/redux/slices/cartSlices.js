import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalValue: 0,
}


const updateTotal = (arr) => {
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
                    totalValue: updateTotal(cart)
                }
            }

            const cart = [...state.cart, {...produto, quantity: total}]
            return {
                ...state,
                totalValue: updateTotal(cart),
                cart: [ ...cart]
            };
        },
        removeProductFromCart: (state, action) => {
            const newCart = state.cart.filter(element => element.id !== action.product.id)
            return {
                ...state,
                cart: newCart,
                totalValue: updateTotal(state)
            }
        },
        clearCart: (state) => initialState

    }
})

export const { clearCart, removeProductFromCart, addProductToCart } = shopingCartSlice.actions
export default shopingCartSlice.reducer;