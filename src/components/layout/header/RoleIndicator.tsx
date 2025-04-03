
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';
import { getRoleBadgeColor, getRoleName } from '@/utils/roleUtils';
import { Shield, BookOpen, GraduationCap, Terminal, Users, Lightbulb, Ghost } from 'lucide-react';

export interface RoleIndicatorProps {
  role: UserRoleType;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ role }) => {
  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 mr-2" />;
      case 'instructor': 
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'student':
        return <GraduationCap className="h-4 w-4 mr-2" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 mr-2" />;
      case 'moderator':
        return <Users className="h-4 w-4 mr-2" />;
      case 'content_creator':
        return <Lightbulb className="h-4 w-4 mr-2" />;
      case 'anonimo':
      case 'guest':
        return <Ghost className="h-4 w-4 mr-2" />;
      default:
        return <GraduationCap className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <Badge variant="outline" className={`${getRoleBadgeColor(role)} transition-colors flex items-center`}>
      {getRoleIcon()}
      {getRoleName(role)}
    </Badge>
  );
};
