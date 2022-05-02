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
