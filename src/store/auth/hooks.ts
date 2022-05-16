import { useCallback, useMemo } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { useActionCreator } from 'hooks';
import { UserRole } from 'core/types';
import { AuthReturnHook } from './types';
import { RootState } from '../types';
import {
  login,
  setError,
  changePassword,
  setSuccess,
  logout as logoutAction,
  setNewPassword,
  initPasswordReset,
  confirmPasswordReset,
} from './actions';
import { clearAuthSession } from './utils';

export const useAuth = (): AuthReturnHook => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  const roles = useMemo(() => {
    const userRoles = { isSuperAdmin: false, isAdmin: false };
    if (authState.role === UserRole.SUPER_AMIN) userRoles.isSuperAdmin = true;
    if (authState.role === UserRole.ADMIN) userRoles.isAdmin = true;
    return userRoles;
  }, [authState.role]);

  const logout = useCallback(() => {
    clearAuthSession();
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    ...authState,
    ...roles,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    login: useActionCreator(login),
    changePassword: useActionCreator(changePassword),
    logout,
    setNewPassword: useActionCreator(setNewPassword),
    initPasswordReset: useActionCreator(initPasswordReset),
    confirmPasswordReset: useActionCreator(confirmPasswordReset),
  };
};
