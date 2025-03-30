
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';
import { getRoleBadgeColor, getRoleName } from '@/utils/roleUtils';
import { Shield, UserCog, User, Terminal, Ghost } from 'lucide-react';

export interface RoleIndicatorProps {
  role: UserRoleType;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ role }) => {
  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 mr-2" />;
      case 'instructor':
        return <UserCog className="h-4 w-4 mr-2" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 mr-2" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4 mr-2" />;
      default:
        return <User className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <Badge variant="outline" className={`${getRoleBadgeColor(role)} transition-colors flex items-center`}>
      {getRoleIcon()}
      {getRoleName(role)}
    </Badge>
  );
};
