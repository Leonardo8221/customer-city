import { Company, CreateCompanyData } from 'store/company/types';
import { apiCall } from '../index';

export const getCompanies = (): Promise<Company[]> =>
  apiCall({
    method: 'get',
    url: '/company',
  });

export const createCompany = (data: CreateCompanyData): Promise<Company> =>
  apiCall({
    method: 'post',
    url: '/company',
    data,
  });

export const updateCompany = (id: number, data: Partial<CreateCompanyData>): Promise<null> =>
  apiCall({
    method: 'put',
    url: `/company/${id}`,
    data,
  });

export const deleteCompany = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/company/${id}` });
