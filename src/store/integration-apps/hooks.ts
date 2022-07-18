import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { setError, setSuccess } from './actions';
import { IntegrationReturnHook } from './types';

export const useIntegration = (): IntegrationReturnHook => {
  const integrationState = useSelector((state: RootState) => state.integration, shallowEqual);

  return {
    ...integrationState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
  };
};
