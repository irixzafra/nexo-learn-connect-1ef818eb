
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';

export interface RoleIndicatorProps {
  role: UserRoleType;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ role }) => {
  const getRoleName = () => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      default:
        return 'Usuario';
    }
  };
  
  const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'instructor':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'student':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <Badge variant="outline" className={`${getRoleColor()} transition-colors`}>
      {getRoleName()}
    </Badge>
  );
};
