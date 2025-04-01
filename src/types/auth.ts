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
