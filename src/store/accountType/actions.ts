import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAccountTypes as getAccountTypesApi,
  getAccountType as getAccountTypeApi,
  updateAccountType as updateAccountTypeApi,
  deleteAccountType as deleteAccountTypeApi,
} from 'http/account/accountType';
import { AccountType, UpdateAccountTypeData } from './types';

const SET_ERROR = 'accountType/SET_ERROR';
const SET_SUCCESS = 'accountType/SET_SUCCESS';
const GET_ACCOUNT_TYPES = 'accountType/GET_ACCOUNT_TYPES';
const GET_ACCOUNT_TYPE = 'accountType/GET_ACCOUNT_TYPE';
const UPDATE_ACCOUNT_TYPE = 'accountType/UPDATE_ACCOUNT_TYPE';
const DELETE_ACCOUNT_TYPE = 'accountType/DELETE_ACCOUNT_TYPE';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getAccountTypes = createAsyncThunk<AccountType[]>(GET_ACCOUNT_TYPES, async () => {
  const accountTypes = await getAccountTypesApi();
  return accountTypes;
});

export const getAccountType = createAsyncThunk<AccountType, number>(GET_ACCOUNT_TYPE, async (id) => {
  const accountType = await getAccountTypeApi(id);
  return accountType;
});

export const updateAccountType = createAsyncThunk<AccountType, UpdateAccountTypeData>(
  UPDATE_ACCOUNT_TYPE,
  async ({ accountTypeId, data }) => {
    const accountType = await updateAccountTypeApi(accountTypeId, data);
    return accountType;
  },
);

export const deleteAccountType = createAsyncThunk<void, number>(DELETE_ACCOUNT_TYPE, async (id) => {
  await deleteAccountTypeApi(id);
});
