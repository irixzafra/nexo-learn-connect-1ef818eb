
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { type UserRoleType } from '@/types/auth';
import { Shield, UserCog, User, Terminal, Ghost } from 'lucide-react';

interface UserRoleDisplayProps {
  role: UserRoleType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Renamed component to avoid conflict with the type
export const UserRoleDisplay: React.FC<UserRoleDisplayProps> = ({ 
  role, 
  showIcon = true,
  size = 'md'
}) => {
  const getRoleBadgeVariant = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'instructor':
        return 'secondary';
      case 'student':
        return 'outline';
      case 'sistemas':
        return 'destructive';
      case 'anonimo':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 mr-1" />;
      case 'instructor':
        return <UserCog className="h-4 w-4 mr-1" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 mr-1" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4 mr-1" />;
      case 'student':
        return <User className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant={getRoleBadgeVariant(role)} className="capitalize">
      {showIcon && getRoleIcon(role)}
      {role}
    </Badge>
  );
};

// Also export with the old name for backward compatibility to avoid breaking changes
export const UserRoleType = UserRoleDisplay;
