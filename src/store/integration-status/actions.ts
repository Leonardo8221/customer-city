import { createAction } from '@reduxjs/toolkit';
import { IntegrationStatus } from './types';

const SET_ERROR = 'integration-status/SET_ERROR';
const SET_SUCCESS = 'integration-status/SET_SUCCESS';

export const setSuccess = createAction<IntegrationStatus>(SET_SUCCESS);
export const setError = createAction<string | boolean>(SET_ERROR);
