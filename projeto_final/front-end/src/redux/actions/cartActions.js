import Types from "../types";

export const addProductToCart = (product, quantity) => {
    return {
      type: Types.ADD_PRODUCT,
      product,
      quantity
    };
  };
  
  export const removeProductFromCart = product => {
    return {
      type: Types.REMOVE_PRODUCT,
      product
    };
  };
  

  export const addAddress = address => {
    return {
      type: Types.REMOVE_PRODUCT,
      address
    };
  };
  