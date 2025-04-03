
export type UserRoleType = 'admin' | 'profesor' | 'instructor' | 'student' | 'sistemas' | 'moderator' | 'content_creator' | 'guest' | 'anonimo' | 'beta_tester';

// Legacy type alias for backward compatibility
export type UserRole = UserRoleType;

export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRoleType;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper functions to work with user roles
export const toUserRoleType = (role?: string | null): UserRoleType => {
  switch (role) {
    case 'admin':
    case 'profesor':
    case 'instructor':
    case 'student':
    case 'sistemas':
    case 'moderator':
    case 'content_creator':
    case 'guest':
    case 'anonimo':
    case 'beta_tester':
      return role as UserRoleType;
    default:
      return 'student'; // Default role
  }
};

export const asUserRoleType = (value: string): UserRoleType => {
  return toUserRoleType(value);
};
