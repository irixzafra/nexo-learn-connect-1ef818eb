
export type UserRole = 'admin' | 'instructor' | 'student' | 'sistemas' | 'anonimo';

export interface UserProfile {
  id: string;
  full_name?: string;
  role: UserRole;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
