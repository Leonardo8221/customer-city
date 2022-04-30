import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { login as loginApi } from 'http/auth';
import { setAuthSession } from './utils';

const SET_ERROR = 'auth/SET_ERROR';
const LOGIN = 'auth/LOGIN';

export const setError = createAction<string | boolean>(SET_ERROR);

export const login = createAsyncThunk<string, { username: string; password: string }>(
  LOGIN,
  async ({ username, password }) => {
    const { accessToken } = await loginApi(username, password);

    setAuthSession({ accessToken });

    return accessToken;
  },
);
