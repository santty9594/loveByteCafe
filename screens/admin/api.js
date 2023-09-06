import { GET_ORDER_URL } from '../../constants/api_constants';
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

}

export { AdminApi };
