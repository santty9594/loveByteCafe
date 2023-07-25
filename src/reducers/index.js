import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import RestaurantReducer from './restaurantReducer';
import FoodsReducer from './foodsReducer';
import CartReducer from './cart';
import OrdersReducer from './ordersReducer';


const rootReducer = combineReducers({
  AuthReducer,
  RestaurantReducer,
  FoodsReducer,
  CartReducer,
  OrdersReducer,
});

export default rootReducer;
