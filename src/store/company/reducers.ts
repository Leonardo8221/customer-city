import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { CompanyState } from './types';
import { setError, setSuccess, getCompanies, createCompany, updateCompany } from './actions';
import { logout } from '../auth/actions';

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
      state.success = `Company "${payload.name}" created successfully!`;
    });

    builder.addCase(updateCompany.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Company updated successfully!';
    });

    builder.addCase(logout, () => initialState);

    builder.addMatcher(isAnyOf(getCompanies.pending, createCompany.pending, updateCompany.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(
      isAnyOf(getCompanies.rejected, createCompany.rejected, updateCompany.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default companyStore.reducer;
