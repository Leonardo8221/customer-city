import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAccountStages as getAccountStagesApi,
  getAccountStage as getAccountStageApi,
  updateAccountStage as updateAccountStageApi,
  deleteAccountStage as deleteAccountStageApi,
} from 'http/account/accountStage';
import { AccountStage, UpdateAccountStageData } from './types';

const SET_ERROR = 'accountStage/SET_ERROR';
const SET_SUCCESS = 'accountStage/SET_SUCCESS';
const GET_ACCOUNT_STAGES = 'accountStage/GET_ACCOUNT_STAGES';
const GET_ACCOUNT_STAGE = 'accountStage/GET_ACCOUNT_STAGE';
const UPDATE_ACCOUNT_STAGE = 'accountStage/UPDATE_ACCOUNT_STAGE';
const DELETE_ACCOUNT_STAGE = 'accountStage/DELETE_ACCOUNT_STAGE';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getAccountStages = createAsyncThunk<AccountStage[]>(GET_ACCOUNT_STAGES, async () => {
  const accountStages = await getAccountStagesApi();
  return accountStages;
});

export const getAccountStage = createAsyncThunk<AccountStage, number>(GET_ACCOUNT_STAGE, async (id) => {
  const accountStage = await getAccountStageApi(id);
  return accountStage;
});

export const updateAccountStage = createAsyncThunk<AccountStage, UpdateAccountStageData>(
  UPDATE_ACCOUNT_STAGE,
  async ({ accountStageId, data }) => {
    const accountStage = await updateAccountStageApi(accountStageId, data);
    return accountStage;
  },
);

export const deleteAccountStage = createAsyncThunk<void, number>(DELETE_ACCOUNT_STAGE, async (id) => {
  await deleteAccountStageApi(id);
});
