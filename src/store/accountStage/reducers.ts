import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import {
  setError,
  setSuccess,
  getAccountStages,
  getAccountStage,
  deleteAccountStage,
  updateAccountStage,
} from './actions';
import { AccountStageState } from './types';

export const initialState: AccountStageState = {
  loading: false,
  error: false,
  success: false,
  accountStages: [],
  accountStage: null,
};

const accountStageReducer = createSlice({
  name: 'accountStage',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AccountStageState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getAccountStages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountStages = payload;
    });

    builder.addCase(getAccountStage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountStage = payload;
    });

    builder.addCase(updateAccountStage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accountStage = payload;
      state.success = 'AccountStage updated successfully!';
    });

    builder.addCase(deleteAccountStage.fulfilled, (state) => {
      state.loading = false;
      state.success = 'AccountStage deleted successfully!';
    });

    builder.addMatcher(
      isAnyOf(
        getAccountStages.pending,
        updateAccountStage.pending,
        getAccountStage.pending,
        deleteAccountStage.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getAccountStages.rejected,
        updateAccountStage.rejected,
        getAccountStage.rejected,
        deleteAccountStage.rejected,
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default accountStageReducer.reducer;
