
import { combineReducers } from 'redux';
import AuthReducer from '../screens/Auth/reducer';
import OrdersReducer from '../screens/Menu/reducer';
import TableReducer from '../screens/Table/reducer';

const rootReducer = combineReducers({
  AuthReducer,
  OrdersReducer,
  TableReducer
});

export default rootReducer;
