import { Integration } from 'store/integration/types';
import { apiCall } from '../index';

export const getIntegrations = (): Promise<Integration[]> => apiCall({ method: 'get', url: '/integration' });

export const getIntegration = (id: number): Promise<Integration> =>
  apiCall({ method: 'get', url: `/integration/${id}` });
