export interface EmailActivityDetail {
  activityId: number;
  email_subject: string;
  email_body: string;
  email_date: Date;
  email_time: Date;
  hasAttachment: boolean;
}

export interface Activity {
  activityId: number;
  activityType: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  emailActivityDetails?: EmailActivityDetail[];
  // callActivityDetails?: [],
}

export interface ActivityState {
  loading: boolean;
  error: boolean;
  success: boolean;
  statusMessage?: string;
  activities: Activity[];
  activity: Activity | null;
}

export interface ActivityReturnHook extends ActivityState {
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setSuccess: (success: boolean) => void;
}
