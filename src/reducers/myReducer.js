const initialState = {
  someKey: [],
};

export default myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_TABLES_TYPES':
      return {
        someKey: payload,
      };
    default:
      return state;
  }
};
