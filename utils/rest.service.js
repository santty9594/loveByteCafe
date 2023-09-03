import AsyncStorageHelper from './AsyncStorageHelper';
import { API_BASE } from '../constants/api_constants';

const dbHelper = new AsyncStorageHelper();
class RestApi {

    async getHeaders() {
        let token = await dbHelper.get('token');
        let _model = { token, };
        return _model;
    }

    async get(url, iheaders, args) {
        try {
            let headers = {
                "Authorization": iheaders.token,
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const options = {
                method: "POST",
                headers: headers,
                body: formData
            };
            let response = await fetch(API_BASE + url, options);
            response = await response.json();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async post(url, iheaders, args) {
        try {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": iheaders.token,
            };
            const options = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(args)
            };
            console.log("options",options)
            let response = await fetch(API_BASE + url, options);
            response = await response.json();
            console.log("response",response)
            return response;
        } catch (error) {
            throw error;
        }
    }


}

export default RestApi;

