import { MENUS_URL, MENUS_CATEGORY_URL } from '../../constants/api_constants';
import RestApi from '../../utils/rest.service';

const restApi = new RestApi();

class MenuApi {

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

}

export { MenuApi };
