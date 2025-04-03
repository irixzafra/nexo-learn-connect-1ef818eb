
export type UserRoleType = 
  | 'admin' 
  | 'student' 
  | 'instructor'
  | 'sistemas'
  | 'moderator'
  | 'content_creator'
  | 'guest'
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
  full_name?: string; // For backward compatibility
  email?: string;
  avatarUrl?: string;
  avatar_url?: string; // For backward compatibility
  bio?: string;
  role: UserRoleType;
  isActive?: boolean;
  created_at?: string; // For backward compatibility
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  preferences?: Record<string, any>;
  verified?: boolean;
  phone?: string;
}

export function toUserRoleType(role: string): UserRoleType {
  if (!role) return 'student';
  
  // Normalize string to avoid case issues
  const normalizedRole = String(role).toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'admin':
      return 'admin';
    case 'instructor':
      return 'instructor';
    case 'student':
      return 'student';
    case 'guest':
      return 'guest';
    case 'sistemas':
      return 'sistemas';
    case 'moderator':
      return 'moderator';
    case 'content_creator':
      return 'content_creator';
    case 'beta_tester':
      return 'beta_tester';
    case 'anonimo':
      return 'anonimo';
    default:
      console.warn(`Unknown role type: "${role}", defaulting to student`);
      return 'student';
  }
}

export function asUserRoleType(role: string): UserRoleType | null {
  if (!role) return null;
  
  // Normalize the role to lowercase and trim whitespace
  const normalizedRole = String(role).toLowerCase().trim();
  
  if (['admin', 'student', 'instructor', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester', 'anonimo'].includes(normalizedRole)) {
    return normalizedRole as UserRoleType;
  }
  return null;
}
