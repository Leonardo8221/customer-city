import { Activity } from 'store/activity/types';
import { apiCall } from '../index';

export const getActivities = (): Promise<Activity[]> => apiCall({ method: 'get', url: '/activity' });
