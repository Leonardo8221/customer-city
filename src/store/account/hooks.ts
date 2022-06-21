import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { AccountReturnHook } from './types';
import { setError, setSuccess, getAccounts, getAccount } from './actions';

export const useAccount = (): AccountReturnHook => {
  const accountState = useSelector((state: RootState) => state.account, shallowEqual);

  return {
    ...accountState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getAccounts: useActionCreator(getAccounts),
    getAccount: useActionCreator(getAccount),
  };
};
