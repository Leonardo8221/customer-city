import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { setError, setLoading, setSuccess } from './actions';
import { ActivityReturnHook } from './types';

export const useActivity = (): ActivityReturnHook => {
  const activityState = useSelector((state: RootState) => state.activity, shallowEqual);

  return {
    ...activityState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setLoading: useActionCreator(setLoading),
  };
};
