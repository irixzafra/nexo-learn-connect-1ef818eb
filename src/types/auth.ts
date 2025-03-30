
// Define all user role types in a consistent format
export type UserRoleType = 
  | 'admin' 
  | 'instructor' 
  | 'student' 
  | 'sistemas' 
  | 'anonimo' 
  | 'moderator' 
  | 'content_creator' 
  | 'guest' 
  | 'beta_tester';

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  username?: string;
  role: UserRoleType; // Changed from optional to required
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function to safely convert a string to a UserRoleType
export function toUserRoleType(role?: string): UserRoleType {
  if (!role) return 'student';
  
  const validRoles: UserRoleType[] = [
    'admin', 'instructor', 'student', 'moderator', 
    'content_creator', 'guest', 'beta_tester', 'sistemas', 'anonimo'
  ];
  
  return validRoles.includes(role as UserRoleType) 
    ? (role as UserRoleType) 
    : 'student';
}

// Helper function to ensure string is a valid UserRoleType
export function asUserRoleType(role: string): UserRoleType {
  return toUserRoleType(role);
}
