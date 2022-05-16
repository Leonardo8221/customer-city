import { UserRole } from 'core/types';

export interface Profile {
  workPhoneNumber: string | null;
  additionalPhoneNumber?: string;
  profileJobRole?: string;
}

export interface User {
  userId: number | null;
  userEmail: string | null;
  userRole: UserRole | null;
  userName: string | null;
  companyId: number | null;
  profile: Profile;
}

export interface UserState extends User {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
}

export interface UserReturnHook extends UserState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getCurrentUser: () => void;
}

export interface CreateUserData {
  userName: string;
  userEmail: string;
  userRole: UserRole;
  workPhoneNumber: string;
  additionalPhoneNumber?: string;
  profileJobRole?: string;
}
