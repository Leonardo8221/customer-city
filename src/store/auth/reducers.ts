import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { setError, login } from './actions';
import { getAutSession } from './utils';

const getInitialState = (): AuthState => {
  const initialAuthSession = getAutSession();
  return {
    loading: false,
    error: false,
    accessToken: null,
    ...(initialAuthSession ?? {}),
  };
};

const authStore = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accessToken = payload;
    });

    builder.addCase(login.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
    });
  },
});

export default authStore.reducer;
