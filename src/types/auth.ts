
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
}

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  userRole: UserRole | null;
  logout: () => Promise<void>;
}
