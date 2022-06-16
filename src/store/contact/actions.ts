import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getContacts as getContactsApi, getContact as getContactApi } from 'http/contact';
import { Contact } from './types';

const SET_ERROR = 'contact/SET_ERROR';
const SET_SUCCESS = 'contact/SET_SUCCESS';
const GET_CONTACTS = 'contact/GET_CONTACTS';
const GET_CONTACT = 'contact/GET_CONTACT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getContacts = createAsyncThunk<Contact[]>(GET_CONTACTS, async () => {
  const contacts = await getContactsApi();
  return contacts;
});

export const getContact = createAsyncThunk<Contact, number>(GET_CONTACT, async (id) => {
  const contact = await getContactApi(id);
  return contact;
});
