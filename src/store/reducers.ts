import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducers';
import companyReducer from './company/reducers';
import userReducer from './user/reducers';
import productReducer from './product/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  product: productReducer,
});

export default rootReducer;
