
import { err } from 'react-native-svg/lib/typescript/xml';
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

export const getMenuCategory = (model, value) => async dispatch => {
    try {
        var temp = await api.getMenuCategory(model);
        if (temp && temp.status == 0) {
            let { data } = temp;
            await dispatch({ type: 'MENU_CATEGORY_FETCH_SUCCESS', payload: data });
            await dispatch({ type: 'GET_TABLE_MENU_COUNT', payload: { selectedTable: value } });
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

export const removeQty = (model, value) => async dispatch => {
    try {
        dispatch({ type: 'REMOVE_QTY_ITEM', payload: model });
        dispatch({ type: 'GET_TABLE_MENU_COUNT', payload: { selectedTable: value } });
    } catch (error) {
    }
}


export const addStartTimeTable = (model) => async dispatch => {
    try {
        dispatch({ type: 'ADD_START_TIME', payload: model });
    } catch (error) {
    }
}


export const placeOrder = (model) => async dispatch => {
    try {
        dispatch({ type: 'TABLE_PLACE_ORDER', payload: model });
    } catch (error) {
        console.log(error)
    }
}




