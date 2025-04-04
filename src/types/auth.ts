
export type UserRoleType = 
  | 'admin' 
  | 'instructor' 
  | 'student' 
  | 'support' 
  | 'sistemas' 
  | 'content_manager' 
  | 'content_creator' 
  | 'analytics' 
  | 'finance' 
  | 'moderator' 
  | 'guest' 
  | 'beta_tester' 
  | 'anonimo';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRoleType | UserRoleType[]) => boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
