import { AuthSession } from 'store/auth/types';
import { apiCall } from '../index';

export const login = async (email: string, password: string): Promise<AuthSession> =>
  apiCall({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });
