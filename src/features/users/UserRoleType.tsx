
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { type UserRoleType } from '@/types/auth';
import { Shield, UserCog, User, Ghost } from 'lucide-react';

interface UserRoleDisplayProps {
  role: UserRoleType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Component to display user roles with appropriate styling
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
      case 'moderator':
        return 'destructive';
      case 'guest':
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
      case 'guest':
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
      {role.toString()}
    </Badge>
  );
};

// Export the component as UserRoleType for backward compatibility
export { UserRoleDisplay as UserRoleType };
