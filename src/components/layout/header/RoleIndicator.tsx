
import React from 'react';
import { UserRole } from '@/types/auth';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle } from 'lucide-react';

interface RoleIndicatorProps {
  viewingAs: string | null;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ viewingAs }) => {
  if (!viewingAs) return null;
  
  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'Administrador';
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
      className="ml-2 bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1.5"
    >
      <Eye className="h-3 w-3" />
      <span>
        Viendo como: {getRoleLabel(viewingAs)}
      </span>
    </Badge>
  );
};
