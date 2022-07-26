import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { AccountStageReturnHook } from './types';
import {
  setError,
  setSuccess,
  getAccountStages,
  getAccountStage,
  deleteAccountStage,
  updateAccountStage,
} from './actions';

export const useAccountStage = (): AccountStageReturnHook => {
  const accountStageState = useSelector((state: RootState) => state.accountStage, shallowEqual);

  return {
    ...accountStageState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getAccountStages: useActionCreator(getAccountStages),
    getAccountStage: useActionCreator(getAccountStage),
    updateAccountStage: useActionCreator(updateAccountStage),
    deleteAccountStage: useActionCreator(deleteAccountStage),
  };
};
