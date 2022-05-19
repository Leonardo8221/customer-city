import { createAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { getCurrentUser as getCurrentUserApi, getUsers as getUsersApi } from 'http/user/index';
import { UserRole } from 'core/types';
import { AuthState } from 'store/auth/types';
import { getCompany } from 'store/company/actions';
import { UpdateUserData, User } from './types';
import { RootState } from '../types';

const SET_ERROR = 'user/SET_ERROR';
const SET_SUCCESS = 'user/SET_SUCCESS';
const GET_CURRENT_USER = 'user/GET_CURRENT_USER';
const GET_USERS = 'user/GET_USERS';
const UPDATE_USER = 'user/UPDATE_USER';

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

export const updateUser = createAction<{ index: number; user: User }>(UPDATE_USER);

export const updateUserAction = (data: UpdateUserData) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const {
    user: { users },
  } = getState();

  const userIndex = users.findIndex((user) => user.userId === data.userId);

  if (userIndex < 0) return;

  const user = users[userIndex];
  const userUpdate = data.user ?? {};
  const profileUpdate = data.profile ?? {};

  dispatch(
    updateUser({ index: userIndex, user: { ...user, ...userUpdate, profile: { ...user.profile, ...profileUpdate } } }),
  );
};
