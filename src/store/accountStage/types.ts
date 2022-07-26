export interface AccountStage {
  accountStageId: number;
  accountStageName: string;
  description: string;
}

export interface AccountStageState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accountStages: AccountStage[];
  accountStage: AccountStage | null;
}

export interface UpdateAccountStageData {
  accountStageId: number;
  data: Partial<AccountStage>;
}

export interface AccountStageReturnHook extends AccountStageState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getAccountStages: () => void;
  getAccountStage: (id: number) => void;
  updateAccountStage: (data: UpdateAccountStageData) => void;
  deleteAccountStage: (id: number) => void;
}
