
import { AdminApi } from './api';

const api = new AdminApi();
export const getOrder = (model) => async dispatch => {
    try {
        var temp = await api.getOrder(model);
        return temp
    } catch (error) {
        console.log("error", error)
    }
}


export const getMenuItems = () => async dispatch => {
    try {
        var temp = await api.getMenuItems({});
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const getMenuCategory = () => async dispatch => {
    try {
        var temp = await api.getMenuCategory({});
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const createMenu = (model) => async dispatch => {
    try {
        var temp = await api.createMenu(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const updateMenu = (model) => async dispatch => {
    try {
        var temp = await api.updateMenu(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const createInventory = (model) => async dispatch => {
    try {
        var temp = await api.createInventory(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteMenu = (model) => async dispatch => {
    try {
        var temp = await api.deleteMenu(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const getInventory = () => async dispatch => {
    try {
        var temp = await api.getInventory({});
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const updateInventory = (model) => async dispatch => {
    try {
        var temp = await api.updateInventory(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteInventory = (model) => async dispatch => {
    try {
        var temp = await api.deleteInventory(model);
        return temp;
    } catch (error) {
        console.log("error", error)
    }
}


