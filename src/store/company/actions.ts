import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCompanies as getCompaniesApi,
  createCompany as createCompanyApi,
  updateCompany as updateCompanyApi,
  deleteCompany as deleteCompanyApi,
} from 'http/company';
import { Company, CreateCompanyData, UpdateCompanyData } from './types';

const SET_ERROR = 'company/SET_ERROR';
const SET_SUCCESS = 'company/SET_SUCCESS';
const GET_COMPANIES = 'company/GET_COMPANIES';
const CREATE_COMPANY = 'company/CREATE_COMPANY';
const UPDATE_COMPANY = 'company/UPDATE_COMPANY';
const DELETE_COMPANIES = 'company/DELETE_COMPANIES';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getCompanies = createAsyncThunk<Company[]>(GET_COMPANIES, async () => {
  const companies = await getCompaniesApi();
  return companies;
});

export const createCompany = createAsyncThunk<Company, CreateCompanyData>(CREATE_COMPANY, async (data) => {
  const company = await createCompanyApi(data);
  return company;
});

export const updateCompany = createAsyncThunk<void, UpdateCompanyData>(UPDATE_COMPANY, async ({ id, data }) => {
  await updateCompanyApi(id, data);
});

export const deleteCompanies = createAsyncThunk<void, number[]>(DELETE_COMPANIES, async (ids, { dispatch }) => {
  await Promise.all(ids.map((id) => deleteCompanyApi(id)));
  dispatch(getCompanies());
});
