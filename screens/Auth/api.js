import {
  LOGIN_URL,
  REGISTER_URL,
  CUSTOMER_CREATE_URL,
  CUSTOMER_GET_URL
} from '../../constants/api_constants';
import RestApi from '../../utils/rest.service';

const restApi = new RestApi();

class AuthApi {

  async login(args) {
    try {
      const path = LOGIN_URL;
      let headers = {
        token: '',
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signup(args) {
    try {
      const path = REGISTER_URL;
      let headers = {
        token: '',
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = CUSTOMER_CREATE_URL;
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCustomer(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = CUSTOMER_GET_URL;
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

}

export { AuthApi };
