
import { UserRoleType } from '@/types/auth';

export interface UserSearchResult {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRoleType | string;
}
