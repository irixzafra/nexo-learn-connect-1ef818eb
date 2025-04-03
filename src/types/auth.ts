
export type UserRoleType = 
  | 'admin' 
  | 'student' 
  | 'instructor'
  | 'profesor' // Include for backward compatibility
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
  switch (role) {
    case 'admin':
      return 'admin';
    case 'instructor':
    case 'profesor': // Handle both for backward compatibility
      return 'instructor';
    case 'student':
    case 'guest':
      return 'student';
    case 'sistemas':
    case 'moderator':
    case 'content_creator':
    case 'beta_tester':
    case 'anonimo':
      // Keep legacy roles as-is for now to avoid breaking existing code
      return role as UserRoleType;
    default:
      return 'student';
  }
}

export function asUserRoleType(role: string): UserRoleType | null {
  if (['admin', 'student', 'instructor', 'profesor', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester', 'anonimo'].includes(role)) {
    return role as UserRoleType;
  }
  return null;
}
