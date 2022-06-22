import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { initialState as authState } from './auth/reducers';
import companyReducer, { initialState as companyState } from './company/reducers';
import userReducer, { initialState as userState } from './user/reducers';
import productReducer, { initialState as productState } from './product/reducers';
import contactReducer, { initialState as contactState } from './contact/reducers';
import accountReducer, { initialState as accountState } from './account/reducers';
import dealReducer, { initialState as dealState } from './deal/reducers';

export const initialRootState = {
  auth: authState,
  company: companyState,
  user: userState,
  product: productState,
  contact: contactState,
  account: accountState,
  deal: dealState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  product: productReducer,
  contact: contactReducer,
  account: accountReducer,
  deal: dealReducer,
});

export default rootReducer;
