import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalValue: 0,
    // address: null
}


const updateTotal = (arr) => {
    var result = arr.reduce((acc, obj) => {
        console.log(acc, obj);
        return acc + obj.quantity * parseFloat(obj.preco)
    }, 0);

    return result
}

const shopingCartSlice = createSlice({
    name: 'shopingCart',
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const {produto, total} = action.payload;
            const finded = state.cart.find(item => item.id === produto.id)

            if (finded) {
                const cart = state.cart.map(item => {
                    if (item.id === finded.id) {
                        return {
                            ...item,
                            quantity: total
                        }
                    }

                    return item
                });

                
                return {
                    ...state,
                    cart: cart,
                    totalValue: updateTotal(cart)
                }
            }

            const cart = [...state.cart, {...produto, quantity: total}]


            console.log("LOG", cart);
            return {
                ...state,
                totalValue: updateTotal(cart),
                cart: [
                    ...cart,  
                ]
            };
        },
        removeProductFromCart: (state, action) => {
            // const {produto, total} = action.payload;
            const newCart = state.cart.filter(element => element.id !== action.product.id)
            return {
                ...state,
                cart: newCart,
                totalValue: updateTotal(state)
            }
        },
        // addAddress: (state, action) => {
        //     return {
        //         ...state,
        //         cart: null,
        //         totalValue: 0,
        //         address: { ...action.address }
        //       }
        // },
        clearCart: (state) => initialState

    }
})

export const { clearCart, removeProductFromCart, addProductToCart} = shopingCartSlice.actions
export default shopingCartSlice.reducer;