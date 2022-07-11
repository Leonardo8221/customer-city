import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getIntegrations, getIntegration } from './actions';
import { IntegrationState } from './types';

export const initialState: IntegrationState = {
  loading: false,
  error: false,
  success: false,
  integrations: [],
  integration: null,
};

const integrationReducer = createSlice({
  name: 'integration',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IntegrationState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getIntegrations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.integrations = payload;
    });

    builder.addCase(getIntegrations.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getIntegrations.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });

    builder.addCase(getIntegration.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.integration = payload;
    });

    builder.addMatcher(isAnyOf(getIntegrations.pending, getIntegration.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(isAnyOf(getIntegrations.rejected, getIntegration.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default integrationReducer.reducer;
