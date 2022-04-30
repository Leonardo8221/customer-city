import { AuthSession } from 'store/auth/types';
import { apiCall } from '../index';

export const login = async (email: string, password: string): Promise<AuthSession> =>
  apiCall({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });

export const changePassword = async (email: string, password: string, newPassword: string): Promise<null> =>
  apiCall({
    method: 'post',
    url: '/auth/change-password',
    data: { email, password, newPassword },
  });
