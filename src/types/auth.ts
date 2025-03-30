
export type UserRoleType = 'student' | 'instructor' | 'admin' | 'sistemas' | 'anonimo' | 'moderator' | 'content_creator' | 'guest' | 'beta_tester';

export const asUserRoleType = (value: any): UserRoleType => {
  const validRoles: UserRoleType[] = ['student', 'instructor', 'admin', 'sistemas', 'anonimo', 'moderator', 'content_creator', 'guest', 'beta_tester'];
  return validRoles.includes(value) ? value as UserRoleType : 'student';
};

export const toUserRoleType = (value: string | null | undefined): UserRoleType => {
  if (!value) return 'student';
  return asUserRoleType(value);
};

export interface UserProfile {
  id: string;
  full_name: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  role: UserRoleType;
}

// Alias UserRole to UserRoleType for backward compatibility
export type UserRole = UserRoleType;
