import { GET_ORDER_URL, MENUS_URL, MENUS_CATEGORY_URL } from '../../constants/api_constants';
import RestApi from '../../utils/rest.service';

const restApi = new RestApi();

class AdminApi {

  async getOrder(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = GET_ORDER_URL;
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMenuItems(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = MENUS_URL;
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMenuCategory(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = MENUS_CATEGORY_URL;
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createMenu(args) {
    try {
      let _header = await restApi.getHeaders();
      const path = '/menu/create';
      let headers = {
        token: _header.token,
      };
      const data = await restApi.post(path, headers, args);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateMenu(args) {
    try {
      let _header = await restApi.getHeaders();
      const path =  '/menu/update';
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

export { AdminApi };
