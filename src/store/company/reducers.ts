import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { CompanyState } from './types';
import { setError, setSuccess, getCompanies, createCompany } from './actions';

const initialState: CompanyState = {
  loading: false,
  error: false,
  success: false,
  companies: [],
};

const companyStore = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CompanyState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getCompanies.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.companies = payload;
    });

    builder.addCase(createCompany.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.companies.push(payload);
      state.success = `Company ${payload.name} created successfully!`;
    });

    builder.addMatcher(isAnyOf(getCompanies.pending, createCompany.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(isAnyOf(getCompanies.rejected, createCompany.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default companyStore.reducer;
