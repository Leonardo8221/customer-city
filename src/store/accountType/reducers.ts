import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getAccountTypes, getAccountType, deleteAccountType, updateAccountType } from './actions';
import { AccountTypeState } from './types';

export const initialState: AccountTypeState = {
  loading: false,
  error: false,
  success: false,
  accountTypes: [],
  accountType: null,
};

const accountTypeReducer = createSlice({
  name: 'accountType',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AccountTypeState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getAccountTypes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountTypes = payload;
    });

    builder.addCase(getAccountType.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountType = payload;
    });

    builder.addCase(updateAccountType.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountType = payload;
      state.success = 'AccountType updated successfully!';
    });

    builder.addCase(deleteAccountType.fulfilled, (state) => {
      state.loading = false;
      state.success = 'AccountType deleted successfully!';
    });

    builder.addMatcher(
      isAnyOf(getAccountTypes.pending, updateAccountType.pending, getAccountType.pending, deleteAccountType.pending),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getAccountTypes.rejected,
        updateAccountType.rejected,
        getAccountType.rejected,
        deleteAccountType.rejected,
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default accountTypeReducer.reducer;
