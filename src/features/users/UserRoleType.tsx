
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types/auth';
import { Shield, UserCog, User, Terminal, Ghost } from 'lucide-react';

interface UserRoleTypeProps {
  role: UserRole;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UserRoleType: React.FC<UserRoleTypeProps> = ({ 
  role, 
  showIcon = true,
  size = 'md'
}) => {
  const getRoleBadgeVariant = (role: UserRole) => {
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

  const getRoleIcon = (role: UserRole) => {
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
