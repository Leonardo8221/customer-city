export const CONTACT_SOURCE_OPTIONS = [
  { label: 'Website', value: 'website' },
  { label: 'Referral', value: 'referral' },
  { label: 'Webinar', value: 'webinar' },
  { label: 'Social', value: 'social' },
  { label: 'Media', value: 'media' },
  { label: 'Tradeshow', value: 'tradeshow' },
  { label: 'Campaign', value: 'campaign' },
];

export const CONTACT_TYPE_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

export const CONTACT_STATUS_OPTIONS = [
  { label: 'Raw', value: 'raw' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'Working', value: 'working' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Nurtured', value: 'nurtured' },
  { label: 'Unqualified', value: 'unqualified' },
];

export const CONTACT_STAGE_OPTIONS = [
  { label: 'Cold', value: 'Cold' },
  { label: 'Warm', value: 'Warm' },
  { label: 'Hot', value: 'Hot' },
  { label: 'MQL', value: 'MQL' },
  { label: 'SQL', value: 'SQL' },
  { label: 'SAL', value: 'SAL' },
  { label: 'Customer', value: 'Customer' },
];

export interface Contact {
  contactId: number;
  contactFirstName: string;
  contactMiddleName: string;
  contactLastName: string;
  contactTitle: string;
  contactAssociate: string;
  contactRole: string;
  contactPrimaryEmail: string;
  contactSecondaryEmail: string;
  contactPhoneNumber: string;
  contactMobileNumber: string;

  contactSource: string;
  contactStage: string;
  contactType: string;
  contactStatus: string;
  //address
  contactStreet: string;
  contactState: string;
  contactZipCode: string;
  contactCity: string;
  contactCountry: string;
  contactCreatedAt: string;
  contactUpdatedAt: string;
  contactModifiedBy: number;
}

export interface ContactState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  contacts: Contact[];
  contact: Contact | null;
}

export interface UpdateContactData {
  contactId: number;
  data: Partial<Contact>;
}

export interface ContactReturnHook extends ContactState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getContacts: () => void;
  getContact: (id: number) => void;
  updateContact: (data: UpdateContactData) => void;
  deleteContact: (id: number) => void;
}

export interface Integration {
  appId: string;
  appName: string;
  appDescription: string;
  appIcon: string;
  isInstalled: boolean;
  property?: {
    details?: {
      provider: {
        name: string;
        link: string;
      };
      totalInstalls: string;
      categories: string[];
      features: string[];
      language: string;
    };
    requirements?: {
      isCompatiblePlan: boolean;
      permissions: string;
      subscriptionTitle: string;
      subscriptions: string;
      subscriptionPageLink: string;
    };
  };
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
  getIntegrations: () => void;
  getIntegration: (name: string) => void;
}
