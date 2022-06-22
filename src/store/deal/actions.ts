import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getDeals as getDealsApi, getDeal as getDealApi } from 'http/deal';
import { Deal } from './types';

const SET_ERROR = 'deal/SET_ERROR';
const SET_SUCCESS = 'deal/SET_SUCCESS';
const GET_ACCOUNTS = 'deal/GET_ACCOUNTS';
const GET_ACCOUNT = 'deal/GET_ACCOUNT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getDeals = createAsyncThunk<Deal[]>(GET_ACCOUNTS, async () => {
  const deals = await getDealsApi();
  return deals;
});

export const getDeal = createAsyncThunk<Deal, number>(GET_ACCOUNT, async (id) => {
  const deal = await getDealApi(id);
  return deal;
});
