import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { AuthReturnHook } from './types';
import { RootState } from '../types';
import { login, setError } from './actions';

export const useAuth = (): AuthReturnHook => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);

  return {
    ...authState,
    setError: useActionCreator(setError),
    login: useActionCreator(login),
  };
};
