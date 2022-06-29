import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getEmails, getEmail, deleteEmail } from './actions';
import { EmailState } from './types';

export const initialState: EmailState = {
  loading: false,
  error: false,
  success: false,
  emails: [],
  email: null,
};

const emailReducer = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<EmailState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getEmails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.emails = payload;
    });

    builder.addCase(getEmail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.email = payload;
    });

    builder.addCase(deleteEmail.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Email deleted successfully!';
    });

    builder.addMatcher(isAnyOf(getEmails.pending, getEmail.pending, deleteEmail.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(isAnyOf(getEmails.rejected, getEmail.rejected, deleteEmail.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default emailReducer.reducer;
