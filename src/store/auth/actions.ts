import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { login as loginApi } from 'http/auth';
import { setAuthSession } from './utils';
import { AuthSession } from './types';

const SET_ERROR = 'auth/SET_ERROR';
const LOGIN = 'auth/LOGIN';

export const setError = createAction<string | boolean>(SET_ERROR);

export const login = createAsyncThunk<AuthSession, { username: string; password: string }>(
  LOGIN,
  async ({ username, password }) => {
    const authSession = await loginApi(username, password);

    setAuthSession(authSession);

    return authSession;
  },
);
