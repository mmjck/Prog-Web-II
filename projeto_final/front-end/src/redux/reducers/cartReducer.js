import Types from "../types"

const initialState = {
  cart: [],
  totalValue: 0,
  address: null,
}

const updateTotal = (state) => {
  var result = state.cart.reduce((acc, obj) => {
    console.log(acc, obj);
    return acc + obj.quantity * obj.preco
  }, 0);

  return result
}




const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    case Types.ADD_PRODUCT:
      const finded = state.cart.find(item => item.id === action.product.id)

      if (finded) {

        const cart = state.cart.map(item => {
          if (item.id === finded.id) {
            return {
              ...item,
              quantity: action.quantity
            }
          }

          return item
        })

        return {
          ...state,
          cart: cart,
          totalValue: updateTotal(state)
        }

      }
      return {
        ...state,
        totalValue: updateTotal(state),
        cart: [...state.cart, {
          ...action.product,
          quantity: action.quantity

        },
        ]
      };


    case Types.CLEAN_CART:
      return {
        ...state,
        cart: null,
        totalValue: 0,
        address: null

      }



    case Types.ADD_ADDRESS_CART:
      const newAddress = action.address

      return {
        ...state,
        cart: null,
        totalValue: 0,
        address: { ...newAddress }
      }



    case Types.REMOVE_PRODUCT:
      const newCart = state.cart.filter(element => element.id !== action.product.id)
      return {
        ...state,
        cart: newCart,
        totalValue: updateTotal(state)
      }



    default:
      return state
  }
}

export default cartReducer;
