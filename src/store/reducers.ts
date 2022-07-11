import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { initialState as authState } from './auth/reducers';
import companyReducer, { initialState as companyState } from './company/reducers';
import userReducer, { initialState as userState } from './user/reducers';
import productReducer, { initialState as productState } from './product/reducers';
import contactReducer, { initialState as contactState } from './contact/reducers';
import accountReducer, { initialState as accountState } from './account/reducers';
import dealReducer, { initialState as dealState } from './deal/reducers';
import dealStageReducer, { initialState as dealStageState } from './dealStage/reducers';
import emailReducer, { initialState as emailState } from './email/reducers';
import tenantReducer, { initialState as tenantState } from './tenant/reducers';
import integrationReducer, { initialState as integrationState } from './integration/reducers';

export const initialRootState = {
  auth: authState,
  company: companyState,
  user: userState,
  product: productState,
  contact: contactState,
  account: accountState,
  deal: dealState,
  email: emailState,
  dealStage: dealStageState,
  tenant: tenantState,
  integration: integrationState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  product: productReducer,
  contact: contactReducer,
  account: accountReducer,
  deal: dealReducer,
  email: emailReducer,
  dealStage: dealStageReducer,
  tenant: tenantReducer,
  integration: integrationReducer,
});

export default rootReducer;
