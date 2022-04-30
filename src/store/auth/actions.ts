import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { login as loginApi, changePassword as changePasswordApi } from 'http/auth';
import { setAuthSession } from './utils';
import { AuthSession } from './types';

const SET_ERROR = 'auth/SET_ERROR';
const SET_SUCCESS = 'auth/SET_SUCCESS';
const LOGIN = 'auth/LOGIN';
const CHANGE_PASSWORD = 'auth/CHANGE_PASSWORD';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const login = createAsyncThunk<AuthSession, { username: string; password: string }>(
  LOGIN,
  async ({ username, password }) => {
    const authSession = await loginApi(username, password);

    setAuthSession(authSession);

    return authSession;
  },
);

export const changePassword = createAsyncThunk<void, { username: string; password: string; newPassword: string }>(
  CHANGE_PASSWORD,
  async ({ username, password, newPassword }) => {
    await changePasswordApi(username, password, newPassword);
  },
);
