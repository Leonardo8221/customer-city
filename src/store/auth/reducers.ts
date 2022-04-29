import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { setError } from './actions';

const initialState: AuthState = {
  loading: false,
  error: false,
  accessToken: null,
};

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export default authStore.reducer;
