import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getCurrentUser as getCurrentUserApi, getUsers as getUsersApi } from 'http/user/index';
import { User } from './types';
import { UserRole } from 'core/types';
import { AuthState } from 'store/auth/types';
import { getCompany } from 'store/company/actions';

const SET_ERROR = 'user/SET_ERROR';
const SET_SUCCESS = 'user/SET_SUCCESS';
const GET_CURRENT_USER = 'user/GET_CURRENT_USER';
const GET_USERS = 'user/GET_USERS';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getCurrentUser = createAsyncThunk<User | null, void, { state: { auth: AuthState } }>(
  GET_CURRENT_USER,
  async (_, { getState, dispatch }) => {
    const {
      auth: { role },
    } = getState();

    if (role === UserRole.SUPER_AMIN) return null;

    const currentUser = await getCurrentUserApi();

    if (currentUser.companyId) {
      dispatch(getCompany(currentUser.companyId));
    }

    return currentUser;
  },
);

export const getUsers = createAsyncThunk<User[]>(GET_USERS, async () => {
  const users = await getUsersApi();
  return users;
});
