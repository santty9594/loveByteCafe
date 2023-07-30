
export const authLogin = (email, password) => (dispatch) => {
  
  dispatch({ type: 'AUTH_LOGIN_REQUEST' });
  axios.post('/api/login', { email, password })
    .then((response) => {
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'AUTH_LOGIN_FAILURE',
        payload: error.message,
      });
    });
};


export const authRegister = (email, password) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email,
    password,
  },
});
export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const fetchTables = (email, password) => ({
  type: 'FETCH_TABLES_TYPES',
  payload: {
    value,
  },
});

export const fetchCuisineTypes = () => ({
  type: 'FETCH_CUISINE_TYPES',
});

export const fetchRestaurant = (id = null) => ({
  type: 'FETCH_RESTAURANT',
  payload: {
    id,
  },
});


export const fetchRestaurantByType = (type = null, isFromCuisine = false) => ({
  type: 'FETCH_RESTAURANT_TYPE',
  payload: {
    type,
    isFromCuisine,
  },
});

export const fetchOrders = () => ({
  type: 'FETCH_ORDERS',
});

export const doCancelOrder = () => ({
  type: 'CANCEL_ORDER',
});

export const createOrder = (items, total) => ({
  type: 'CREATE_ORDER',
  payload: {
    items,
    total,
  },
});


export const tableType = (id) => ({
  type: 'SELECT_TABLE_TYPE',
  payload: id
});


export const bookedTable = (id) => ({
  type: 'BOOK_TABLE_NUMBER',
  payload: id
});


