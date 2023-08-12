
import { MenuApi } from './api';

const api = new MenuApi();
export const getMenuItems = (model) => async dispatch => {
    try {
        var temp = await api.getMenuItems(model);
        if (temp && temp.status == 0) {
            let { data } = temp;
            await dispatch({ type: 'MENU_FETCH_SUCCESS', payload: data });
        } else {
            await dispatch({ type: 'AUTH_LOGIN_ERROR', payload: temp.message });
        }
    } catch (error) {
        dispatch({ type: "AUTH_LOGIN_ERROR", error });
    }
}

export const getMenuCategory = (model) => async dispatch => {
    try {
        var temp = await api.getMenuCategory(model);
        if (temp && temp.status == 0) {
            let { data } = temp;
            await dispatch({ type: 'MENU_CATEGORY_FETCH_SUCCESS', payload: data });
        } else {
            await dispatch({ type: 'AUTH_REGISTER_ERROR', payload: temp.message });
        }
    } catch (error) {
        dispatch({ type: "AUTH_REGISTER_ERROR", error });
    }
}

export const addItemMenu = (model) => async dispatch => {
    try {
        dispatch({ type: 'ADD_MENU_ITEM', payload: model });
    } catch (error) {
    }
}

export const addQty = (model) => async dispatch => {
    try {
        dispatch({ type: 'ADD_QTY_ITEM', payload: model });
    } catch (error) {
    }
}

export const removeQty = (model) => async dispatch => {
    try {
        dispatch({ type: 'REMOVE_QTY_ITEM', payload: model });
    } catch (error) {
    }
}




