
import AsyncStorageHelper from '../../utils/AsyncStorageHelper';
import { AuthApi } from './api';

const api = new AuthApi();
const dbHelper = new AsyncStorageHelper();

export const authLogin = (model) => async dispatch => {
  try {
    await dispatch({ type: 'AUTH_LOGIN_LOADING' });
    var temp = await api.login(model);
    if (temp && temp.status == 0) {
      let { token } = temp.data;
      dbHelper.set('token', token);
      await dispatch({ type: 'AUTH_LOGIN_SUCCESS', payload: token });
    } else {
      await dispatch({ type: 'AUTH_LOGIN_ERROR', payload: temp.message });
    }
  } catch (error) {
    dispatch({ type: "AUTH_LOGIN_ERROR", error });
  }
}

export const signupUser = (model) => async dispatch => {
  try {
    await dispatch({ type: 'AUTH_REGISTER_LOADING' });
    var temp = await api.signup(model);
    if (temp && temp.type == "success") {
      await dispatch({ type: 'AUTH_REGISTER_SUCCESS', payload: temp.message });
    } else {
      await dispatch({ type: 'AUTH_REGISTER_ERROR', payload: temp.message });
    }
  } catch (error) {
    await dispatch({ type: 'AUTH_REGISTER_ERROR', payload: "Something went wrong" });
  }
}

export const setupPin = (model) => async dispatch => {
  try {
    await dispatch({ type: 'PIN_CREATION_SUCCESS', payload: model });
  } catch (error) {
    console.log("error", error.message)
  }
}

export const createCustomer = (model) => async dispatch => {
  try {
    var temp = await api.createCustomer(model);
    if (temp && temp.status == 0) {
      await dispatch({ type: 'CUSTOMER_REGISTER_SUCCESS', payload: "Customer Created Successfully" });
    } else {
      await dispatch({ type: 'CUSTOMER_REGISTER_ERROR', payload: temp.message });
    }
  } catch (error) {
    dispatch({ type: "CUSTOMER_REGISTER_ERROR", error });
  }
}

export const getCustomerByPhone = (model) => async dispatch => {
  try {
    var temp = await api.getCustomer(model);
    if (temp && temp.status == 0) {
      await dispatch({ type: 'FETCH_CUSTOMER_DETAILS', payload: temp.data });
    } else {
      await dispatch({ type: 'FETCH_CUSTOMER_ERROR', payload: temp.message });
    }
  } catch (error) {
    dispatch({ type: "FETCH_CUSTOMER_ERROR", error });
  }
}
