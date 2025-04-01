
export type UserRoleType = 
  | 'admin' 
  | 'guest' 
  | 'student' 
  | 'instructor' 
  | 'moderator' 
  | 'content_creator' 
  | 'sistemas' 
  | 'beta_tester'
  | 'anonimo';

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRoleType;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  preferences?: Record<string, any>;
  verified?: boolean;
  phone?: string;
}

export function toUserRoleType(role: string): UserRoleType {
  switch (role) {
    case 'admin':
    case 'guest':
    case 'student':
    case 'instructor':
    case 'moderator':
    case 'content_creator':
    case 'sistemas':
    case 'beta_tester':
    case 'anonimo':
      return role as UserRoleType;
    default:
      return 'guest';
  }
}

export function asUserRoleType(role: string): UserRoleType | null {
  if (['admin', 'guest', 'student', 'instructor', 'moderator', 'content_creator', 'sistemas', 'beta_tester', 'anonimo'].includes(role)) {
    return role as UserRoleType;
  }
  return null;
}
