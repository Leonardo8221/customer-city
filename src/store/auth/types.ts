export interface AuthState {
  loading: boolean;
  error: boolean | string;
  accessToken: string | null;
  id: string | null;
  email: string | null;
  roles: string[];
}

export interface AuthReturnHook extends AuthState {
  setError: (error: string | boolean) => void;
  login: (data: { username: string; password: string }) => void;
}

export interface AuthSession {
  accessToken: string;
  id: string;
  email: string;
  roles: string[];
}
