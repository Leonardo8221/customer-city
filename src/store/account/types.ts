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
  accountStatus: number;
  accountType: string;
}

export interface AccountState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accounts: Account[];
  account: Account | null;
}

export interface AccountReturnHook extends AccountState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getAccounts: () => void;
  getAccount: (id: number) => void;
}
