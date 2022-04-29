import { createAction } from '@reduxjs/toolkit';

const SET_ERROR = 'auth/SET_ERROR';

export const setError = createAction<string | boolean>(SET_ERROR);
