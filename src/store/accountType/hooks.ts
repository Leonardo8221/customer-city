import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { AccountTypeReturnHook } from './types';
import { setError, setSuccess, getAccountTypes, getAccountType, deleteAccountType, updateAccountType } from './actions';

export const useAccountType = (): AccountTypeReturnHook => {
  const accountTypeState = useSelector((state: RootState) => state.accountType, shallowEqual);

  return {
    ...accountTypeState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getAccountTypes: useActionCreator(getAccountTypes),
    getAccountType: useActionCreator(getAccountType),
    updateAccountType: useActionCreator(updateAccountType),
    deleteAccountType: useActionCreator(deleteAccountType),
  };
};
