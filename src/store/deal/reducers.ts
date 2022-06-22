import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { setError, setSuccess, getDeals, getDeal } from './actions';
import { DealState } from './types';

export const initialState: DealState = {
  loading: false,
  error: false,
  success: false,
  deals: [],
  deal: null,
};

const dealReducer = createSlice({
  name: 'deal',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DealState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getDeals.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.deals = payload;
    });

    builder.addCase(getDeals.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getDeals.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });

    builder.addCase(getDeal.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.deal = payload;
    });
  },
});

export default dealReducer.reducer;
