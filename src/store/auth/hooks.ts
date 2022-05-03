import { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { useActionCreator } from 'hooks';
import { AuthReturnHook } from './types';
import { RootState } from '../types';
import { login, setError, changePassword, setSuccess, logout as logoutAction } from './actions';
import { clearAuthSession } from './utils';

export const useAuth = (): AuthReturnHook => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    clearAuthSession();
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    ...authState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    login: useActionCreator(login),
    changePassword: useActionCreator(changePassword),
    logout,
  };
};
