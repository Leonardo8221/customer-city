export const ACCOUNT_INDUSTRY_OPTIONS = [{ label: 'Banking', value: 'Banking' }];

export const ACCOUNT_STAGE_OPTIONS = [
  { label: 'Cold', value: 'Cold' },
  { label: 'Warm', value: 'Warm' },
  { label: 'Hot', value: 'Hot' },
  { label: 'MQL', value: 'MQL' },
  { label: 'SQL', value: 'SQL' },
  { label: 'SAL', value: 'SAL' },
  { label: 'Customer', value: 'Customer' },
];

export const ACCOUNT_STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

export const ACCOUNT_TYPE_OPTIONS = [{ label: 'Startup', value: 'Startup' }];

export interface Account {
  accountId: number;
  accountName: string;
  accountDescription: string;
  accountParentOf: number;
  accountChildOf: number;
  accountBillingStreet: string;
  accountBillingCity: string;
  accountBillingState: string;
  accountBillingCountry: string;
  accountBillingZipCode: string;
  accountWebSite: string;
  accountRevenue: string;
  accountIndustry: string;
  accountPrimaryContact: string;
  accountStage: string;
  accountStatus: string;
  accountType: string;
  accountCreatedAt: string;
  accountUpdatedAt: string;
  accountModifiedBy: number;
}

export interface AccountState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accounts: Account[];
  account: Account | null;
}

export interface UpdateAccountData {
  accountId: number;
  data: Partial<Account>;
}

export interface AccountReturnHook extends AccountState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getAccounts: () => void;
  getAccount: (id: number) => void;
  updateAccount: (data: UpdateAccountData) => void;
  deleteAccount: (id: number) => void;
}
