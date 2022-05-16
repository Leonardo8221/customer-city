import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducers';
import companyReducer from './company/reducers';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
});

export default rootReducer;
