import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { setError, login, changePassword, setSuccess, logout } from './actions';
import { getAutSession } from './utils';

const getInitialState = (): AuthState => {
  const initialAuthSession = getAutSession();
  return {
    loading: false,
    error: false,
    success: false,
    accessToken: null,
    id: null,
    email: null,
    roles: [],
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

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accessToken = payload.accessToken;
      state.id = payload.id;
      state.email = payload.email;
      state.roles = payload.roles;
    });

    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Changed password successfully!';
    });

    builder.addCase(logout, () => getInitialState());

    builder.addMatcher(isAnyOf(login.pending, changePassword.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(isAnyOf(login.rejected, changePassword.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default authStore.reducer;
