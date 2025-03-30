
export interface UserRole {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  permissions?: string[];
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name: string;
  avatar_url?: string;
  role: UserRoleType;
  created_at?: string;
  roles?: UserRole[];
  username?: string;
  bio?: string;
  headline?: string;
  website?: string;
  location?: string;
  social_networks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  preferences?: {
    email_notifications?: boolean;
    dark_mode?: boolean;
  };
  is_instructor?: boolean;
  is_admin?: boolean;
  last_login?: string;
  is_active?: boolean;
}

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

// Define all roles as a string literal type
export type UserRoleType = 
  | 'admin' 
  | 'instructor' 
  | 'student' 
  | 'moderator' 
  | 'content_creator'
  | 'guest'
  | 'beta_tester'
  | 'sistemas'
  | 'anonimo';

// Helper functions for type conversion
export const asUserRoleType = (value: string): UserRoleType => {
  const validRoles: UserRoleType[] = [
    'admin', 'instructor', 'student', 'moderator', 
    'content_creator', 'guest', 'beta_tester', 'sistemas', 'anonimo'
  ];
  
  return validRoles.includes(value as UserRoleType) 
    ? (value as UserRoleType) 
    : 'guest';
};

// String-to-UserRoleType conversion helper
export const toUserRoleType = (value: string | UserRoleType): UserRoleType => {
  return asUserRoleType(value as string);
};

// For backward compatibility, export a type alias, but don't declare a duplicate
export type { UserRoleType as UserRole };
