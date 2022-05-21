import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { initialState as authState } from './auth/reducers';
import companyReducer, { initialState as companyState } from './company/reducers';
import userReducer, { initialState as userState } from './user/reducers';
import productReducer, { initialState as productState } from './product/reducers';

export const initialRootState = {
  auth: authState,
  company: companyState,
  user: userState,
  product: productState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  product: productReducer,
});

export default rootReducer;
