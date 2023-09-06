
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


