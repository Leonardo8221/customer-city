import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { DealStageReturnHook } from './types';
import { setError, setSuccess, getDealStages, getDealStage, deleteDealStage, updateDealStage } from './actions';

export const useDealStage = (): DealStageReturnHook => {
  const dealStageState = useSelector((state: RootState) => state.dealStage, shallowEqual);

  return {
    ...dealStageState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getDealStages: useActionCreator(getDealStages),
    getDealStage: useActionCreator(getDealStage),
    updateDealStage: useActionCreator(updateDealStage),
    deleteDealStage: useActionCreator(deleteDealStage),
  };
};
