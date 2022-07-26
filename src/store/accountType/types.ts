export interface AccountType {
  accountTypeId: number;
  accountTypeName: string;
  description: string;
}

export interface AccountTypeState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accountTypes: AccountType[];
  accountType: AccountType | null;
}

export interface UpdateAccountTypeData {
  accountTypeId: number;
  data: Partial<AccountType>;
}

export interface AccountTypeReturnHook extends AccountTypeState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getAccountTypes: () => void;
  getAccountType: (id: number) => void;
  updateAccountType: (data: UpdateAccountTypeData) => void;
  deleteAccountType: (id: number) => void;
}
