import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { CompanyReturnHook } from './types';
import { RootState } from '../types';
import {
  setError,
  setSuccess,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompanies,
  getCompany,
} from './actions';

export const useCompany = (): CompanyReturnHook => {
  const companyState = useSelector((state: RootState) => state.company, shallowEqual);

  return {
    ...companyState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getCompanies: useActionCreator(getCompanies),
    createCompany: useActionCreator(createCompany),
    updateCompany: useActionCreator(updateCompany),
    deleteCompanies: useActionCreator(deleteCompanies),
    getCompany: useActionCreator(getCompany),
  };
};
