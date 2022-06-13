import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { ContactReturnHook } from './types';
import { setError, setSuccess, getContacts } from './actions';

export const useContact = (): ContactReturnHook => {
  const contactState = useSelector((state: RootState) => state.contact, shallowEqual);

  return {
    ...contactState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getContacts: useActionCreator(getContacts),
  };
};
