import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
