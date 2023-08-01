const initialState = {
  loginError: null,
  loginLoading: false,
  loginToken: null,
  loginSuccess: false,
  registerSuccess: false,
  registerLoading: false,
  registerError: null,
  registerMessage: null,
  pinNumber: null,
};

export default AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH_LOGIN_LOADING':
      return {
        ...state,
        loginLoading: true,
      };
    case 'AUTH_HYDRATE_TOKEN':
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        loginToken: payload,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        loginLoading: false,
        pinNumber: null,
        loginError: false,
        loginSuccess: true,
        loginToken: payload,
      };
    case 'AUTH_LOGIN_ERROR':
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginError: payload,
        loginToken: null,
      };
    case 'AUTH_REGISTER_LOADING':
      return {
        ...state,
        registerLoading: true,
      };
    case 'AUTH_REGISTER_SUCCESS':
      return {
        ...state,
        registerLoading: false,
        registerError: false,
        registerSuccess: true,
        registerMessage: payload,
      };
    case 'AUTH_REGISTER_ERROR':
      return {
        ...state,
        registerSuccess: false,
        registerError: payload,
        registerLoading: false,
        registerMessage: null,
      };
    case 'PIN_CREATION_SUCCESS':
      return {
        ...state,
        pinNumber: payload,
      };
    case 'AUTH_LOGOUT_RESET':
      return initialState;
    default:
      return state;
  }
};
