
export type UserRoleType = 
  | 'admin' 
  | 'student' 
  | 'profesor';

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
    case 'profesor':
    case 'instructor': // For backward compatibility
      return 'profesor';
    case 'student':
    default:
      return 'student';
  }
}

export function asUserRoleType(role: string): UserRoleType | null {
  if (['admin', 'student', 'profesor'].includes(role)) {
    return role as UserRoleType;
  }
  return null;
}
