import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getProducts as getProductsApi } from 'http/product';
import { Product } from './types';

const SET_ERROR = 'product/SET_ERROR';
const SET_SUCCESS = 'product/SET_SUCCESS';
const GET_PRODUCTS = 'product/GET_PRODUCTS';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getProducts = createAsyncThunk<Product[]>(GET_PRODUCTS, async () => {
  const products = await getProductsApi();
  return products;
});
