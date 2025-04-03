
import { UserRoleType } from '@/types/auth';

// Define actual UserRole interface for use in the RolesListTab component
export interface UserRole {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at?: string;
  permissions?: string[];
}

// This is for backward compatibility with code that expects UserRole as a type alias
export type UserRoleAlias = UserRoleType;

export default UserRole;
