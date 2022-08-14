import Types from "../types";



export const changeUser = (data) => {
    return {
      type: Types.CHANGE_USER,
      payload: data,
    };
  };