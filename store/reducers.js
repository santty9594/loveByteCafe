
import { combineReducers } from 'redux';
import AuthReducer from '../screens/Auth/reducer';
import TableReducer from '../screens/Table/reducer';
import MenuReducer from '../screens/Menu/reducer';

const rootReducer = combineReducers({
  AuthReducer,
  TableReducer,
  MenuReducer
});

export default rootReducer;
