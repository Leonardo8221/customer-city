export interface AuthState {
  loading: boolean;
  error: boolean | string;
  accessToken: string | null;
}

export interface AuthReturnHook extends AuthState {
  setError: (error: string | boolean) => void;
  login: (data: { username: string; password: string }) => void;
}
