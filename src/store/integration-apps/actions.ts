import { createAction } from '@reduxjs/toolkit';

const SET_ERROR = 'integration-apps/SET_ERROR';
const SET_SUCCESS = 'integration-apps/SET_SUCCESS';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);
