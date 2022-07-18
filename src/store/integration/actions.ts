import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIntegrations as getIntegrationsApi, getIntegration as getIntegrationApi } from 'http/integration';
import { Integration } from './types';

const SET_ERROR = 'integration/SET_ERROR';
const SET_SUCCESS = 'integration/SET_SUCCESS';
const GET_INTEGRATIONS = 'integration/GET_INTEGRATIONS';
const GET_INTEGRATION = 'integration/GET_INTEGRATION';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getIntegrations = createAsyncThunk<Integration[]>(GET_INTEGRATIONS, async () => {
  return await getIntegrationsApi();
});

export const getIntegration = createAsyncThunk<Integration, number>(GET_INTEGRATION, async (id) => {
  return await getIntegrationApi(id);
});
