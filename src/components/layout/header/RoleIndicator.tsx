
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RoleIndicatorProps {
  className?: string;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className }) => {
  const { userRole, effectiveRole } = useAuth();
  
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'instructor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'student':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };
  
  if (!effectiveRole) return null;
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Badge className={cn("capitalize font-semibold", getRoleBadgeColor(effectiveRole))}>
        {getRoleName(effectiveRole)}
      </Badge>
    </div>
  );
};

export default RoleIndicator;
