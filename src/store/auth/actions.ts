import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { login as loginApi, changePassword as changePasswordApi, setNewPassword as setNewPasswordApi } from 'http/auth';
import { setAuthSession as persistAuthSession } from './utils';
import { AuthSession, ChangePasswordData, LoginData } from './types';
import { RootState } from '../types';

const SET_ERROR = 'auth/SET_ERROR';
const SET_SUCCESS = 'auth/SET_SUCCESS';
const LOGIN = 'auth/LOGIN';
const CHANGE_PASSWORD = 'auth/CHANGE_PASSWORD';
const LOG_OUT = 'auth/LOG_OUT';
const SET_AUTH_SESSION = 'auth/SET_AUTH_SESSION';
const SET_SESSION = 'auth/SET_SESSION';
const SET_NEW_PASSWORD = 'auth/SET_NEW_PASSWORD';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const logout = createAction<void>(LOG_OUT);

export const setAuthSession = createAction<AuthSession>(SET_AUTH_SESSION);

export const setSession = createAction<{ session: string; rememberMe: boolean; email: string }>(SET_SESSION);

export const login = createAsyncThunk<void, LoginData>(LOGIN, async ({ email, password, rememberMe }, { dispatch }) => {
  const { accessToken, session } = await loginApi(email, password);

  if (session) {
    persistAuthSession({ accessToken: '', id: '', roles: [], email, session, rememberMe }, rememberMe);
    dispatch(setSession({ session, rememberMe, email }));
    return;
  }

  if (!accessToken) return;

  const { sub: id, ['cognito:groups']: roles } = jwtDecode<JwtPayload & { sub: string; ['cognito:groups']: string[] }>(
    accessToken,
  );

  const authSession: AuthSession = { accessToken, id, roles, email, rememberMe };

  persistAuthSession(authSession, rememberMe);

  dispatch(setAuthSession(authSession));
});

export const changePassword = createAsyncThunk<void, ChangePasswordData>(
  CHANGE_PASSWORD,
  async ({ email, password }) => {
    await changePasswordApi(email, password);
  },
);

export const setNewPassword = createAsyncThunk<void, string>(
  SET_NEW_PASSWORD,
  async (password, { getState, dispatch }) => {
    const {
      auth: { rememberMe, email, session },
    } = getState() as RootState;

    if (!email || !session) return;

    const { accessToken } = await setNewPasswordApi(email, password, session);

    const { sub: id, ['cognito:groups']: roles } = jwtDecode<
      JwtPayload & { sub: string; ['cognito:groups']: string[] }
    >(accessToken);

    const authSession: AuthSession = { accessToken, id, roles, email, rememberMe };

    persistAuthSession(authSession, rememberMe);

    dispatch(setAuthSession(authSession));
  },
);
