const initialState = {
  cartData: [],
  inProgress: false,
};

export default CartReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case 'SAVE_NEW_CART':
      return {
        ...state,
        cartData: payload,
      };
    case 'IN_PROGRESS':
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
};
