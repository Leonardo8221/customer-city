import { Contact } from 'store/contact/types';
import { apiCall } from '../index';

export const createContact = (data: Partial<Contact>): Promise<Contact> =>
  apiCall({ method: 'post', url: '/contact', data });

export const getContacts = (): Promise<Contact[]> => apiCall({ method: 'get', url: '/contact' });

export const updateContact = (id: number, data: Partial<Contact>): Promise<null> =>
  apiCall({ method: 'put', url: `/contact/${id}`, data });

export const deleteContact = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/contact/${id}` });
