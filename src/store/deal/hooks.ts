import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { DealReturnHook } from './types';
import { setError, setSuccess, getDeals, getDeal, deleteDeal } from './actions';

export const useDeal = (): DealReturnHook => {
  const dealState = useSelector((state: RootState) => state.deal, shallowEqual);

  return {
    ...dealState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getDeals: useActionCreator(getDeals),
    getDeal: useActionCreator(getDeal),
    deleteDeal: useActionCreator(deleteDeal),
  };
};
