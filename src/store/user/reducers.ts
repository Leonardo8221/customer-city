import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { setError, setSuccess, getCurrentUser } from './actions';
import { UserState } from './types';

const initialState: UserState = {
  loading: false,
  error: false,
  success: false,
  userId: null,
  userEmail: null,
  userRole: null,
  userName: null,
  companyId: null,
  profile: {
    workPhoneNumber: null,
    additionalPhoneNumber: undefined,
    profileJobRole: undefined,
  },
};

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (!payload) return;
      state.userId = payload.userId;
      state.userEmail = payload.userEmail;
      state.userRole = payload.userRole;
      state.userName = payload.userName;
      state.companyId = payload.companyId;
      state.profile = payload.profile;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getCurrentUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default userStore.reducer;
