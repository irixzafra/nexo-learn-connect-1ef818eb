
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
  full_name: string;  // Cambiado a requerido para coincidir con la definición usada
  avatar_url?: string;
  role?: UserRoleType;
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

export type UserRoleType = 
  | 'admin' 
  | 'instructor' 
  | 'student' 
  | 'moderator' 
  | 'content_creator'
  | 'guest'
  | 'beta_tester';
