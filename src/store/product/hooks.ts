import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { ProductReturnHook } from './types';
import { setError, setSuccess, getProducts } from './actions';

export const useProduct = (): ProductReturnHook => {
  const productState = useSelector((state: RootState) => state.product, shallowEqual);

  return {
    ...productState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getProducts: useActionCreator(getProducts),
  };
};
