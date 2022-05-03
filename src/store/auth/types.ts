export interface AuthState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accessToken: string | null;
  id: string | null;
  email: string | null;
  roles: string[];
}

export interface AuthReturnHook extends AuthState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  login: (data: { username: string; password: string }) => void;
  changePassword: (data: { username: string; password: string; newPassword: string }) => void;
  logout: () => void;
}

export interface AuthSession {
  accessToken: string;
  id: string;
  email: string;
  roles: string[];
}
