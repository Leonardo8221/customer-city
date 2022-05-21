import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { setError, setSuccess, getProducts } from './actions';
import { ProductState } from './types';

export const initialState: ProductState = {
  loading: false,
  error: false,
  success: false,
  products: [],
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    });

    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getProducts.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default productReducer.reducer;
