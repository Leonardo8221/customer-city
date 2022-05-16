import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { UserReturnHook } from './types';
import { setError, setSuccess, getCurrentUser } from './actions';

export const useUser = (): UserReturnHook => {
  const userState = useSelector((state: RootState) => state.user, shallowEqual);

  return {
    ...userState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getCurrentUser: useActionCreator(getCurrentUser),
  };
};
