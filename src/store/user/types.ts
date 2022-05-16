import { UserRole } from 'core/types';

export interface Profile {
  profileId: number;
  workPhoneNumber: string;
  additionalPhoneNumber?: string;
  profileJobRole?: string;
}

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  companyId?: number;
  userCreatedAt: Date;
  userUpdatedAt: Date;
  profile: Profile;
}

export interface UserState {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  user: User | null;
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
