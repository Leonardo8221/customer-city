export enum APPLICATION_STATUS {
  INSTALLED = 'installed',
  NOT_INSTALLED = 'not-installed',
}

export interface IntegrationStatus {
  applicationStatus: string;
}

export interface IntegrationStatusState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  data: IntegrationStatus;
}

export interface IntegrationReturnHook extends IntegrationStatusState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: IntegrationStatus) => void;
}
