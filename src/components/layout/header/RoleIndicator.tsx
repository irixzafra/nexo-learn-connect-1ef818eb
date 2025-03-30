
import React from 'react';
import { UserRole } from '@/types/auth';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle } from 'lucide-react';

export interface RoleIndicatorProps {
  viewingAs: string | null;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ viewingAs }) => {
  if (!viewingAs) return null;
  
  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'instructor':
        return 'Instructor';
      case 'sistemas':
        return 'Sistemas';
      case 'anonimo':
        return 'Anónimo';
      case 'student':
        return 'Estudiante';
      default:
        return role;
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className="bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1 py-0.5 px-2 text-xs"
    >
      <Eye className="h-3 w-3" />
      {getRoleLabel(viewingAs)}
    </Badge>
  );
};
