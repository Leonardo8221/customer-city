export interface Integration {
  integrationId: number;
  applicationName: string;
  applicationDescription: string;
  applicationIcon: string;
  applicationStatus: string;
  providerName?: string;
  providerLink?: string;
  totalInstalls?: string;
  categories?: string[];
  features?: string[];
  languages?: string;
  requirementPermissions?: string;
  subscriptionTitle?: string;
  subscriptions?: string;
  subscriptionLink?: string;
}

export interface IntegrationState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  integrations: Integration[];
  integration: Integration | null;
}

export interface IntegrationReturnHook extends IntegrationState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
}
