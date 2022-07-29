import { Activity, EmailActivityDetail } from 'store/activity/types';
import { ACTIVITY_TYPE_ID, CONTACT_STAGE_ID } from 'types';
import { apiCall } from '../index';

export interface CreateActivityDto extends Partial<Activity> {
  activityTypeId: ACTIVITY_TYPE_ID;
  status: string;
  startDate: Date;
  dueDate: Date;
  contactStageId: CONTACT_STAGE_ID;
  emailActivityDetail?: Partial<EmailActivityDetail>;
  // callActivityDetail?: {}
}

export const getActivities = (): Promise<Activity[]> => apiCall({ method: 'get', url: '/activity' });
export const createActivity = (data: Partial<CreateActivityDto>): Promise<Activity> =>
  apiCall({ method: 'post', url: '/activity', data });
