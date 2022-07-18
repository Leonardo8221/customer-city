import { createAction } from '@reduxjs/toolkit';
import { Integration } from './types';

const SET_ERROR = 'integration-apps/SET_ERROR';
const SET_SUCCESS = 'integration-apps/SET_SUCCESS';

export const setSuccess = createAction<Integration[] | boolean>(SET_SUCCESS);
export const setError = createAction<string | boolean>(SET_ERROR);
