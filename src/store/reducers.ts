import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducers';
import companyReducer from './company/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
});

export default rootReducer;
