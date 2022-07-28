import { createAction } from '@reduxjs/toolkit';

const SET_LOADING = 'activity/SET_LOADING';
const SET_ERROR = 'activity/SET_ERROR';
const SET_SUCCESS = 'activity/SET_SUCCESS';

export const setLoading = createAction<boolean>(SET_LOADING);
export const setError = createAction<boolean>(SET_ERROR);
export const setSuccess = createAction<boolean>(SET_SUCCESS);
