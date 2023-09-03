import { MAKE_PAYMENT_URL } from '../../constants/api_constants';
import RestApi from '../../utils/rest.service';

const restApi = new RestApi();

class TableApi {
    async makePayment(args) {
        try {
            let _header = await restApi.getHeaders();
            const path = MAKE_PAYMENT_URL;
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

export { TableApi };
