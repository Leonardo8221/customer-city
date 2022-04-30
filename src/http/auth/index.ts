import { apiCall } from '../index';

export const login = async (email: string, password: string): Promise<string> =>
  apiCall({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });
