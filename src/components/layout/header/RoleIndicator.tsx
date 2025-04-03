
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Shield, BookOpen, GraduationCap, User, ShieldAlert } from 'lucide-react';

interface RoleIndicatorProps {
  className?: string;
  asToggler?: boolean;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className, asToggler = false }) => {
  const { userRole, effectiveRole, isViewingAsOtherRole, setSimulatedRole, resetToOriginalRole } = useAuth();
  
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <BookOpen className="h-4 w-4" />;
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  
  const handleSwitchRole = (role: string) => {
    if (role === 'original') {
      resetToOriginalRole();
    } else {
      setSimulatedRole(role as any);
    }
  };
  
  if (!effectiveRole) return null;
  
  const roleBadge = (
    <Badge 
      className={cn(
        "capitalize font-semibold cursor-pointer", 
        getRoleBadgeColor(effectiveRole),
        isViewingAsOtherRole && "border-2 border-yellow-500",
        className
      )}
    >
      {getRoleName(effectiveRole)}
      {isViewingAsOtherRole && " (Vista)"}
    </Badge>
  );
  
  if (!asToggler) {
    return <div className={cn("flex items-center space-x-2", className)}>{roleBadge}</div>;
  }
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {roleBadge}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSwitchRole('admin')} className="gap-2">
            <Shield className="h-4 w-4" />
            <span>Ver como Administrador</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSwitchRole('instructor')} className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Ver como Instructor</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSwitchRole('student')} className="gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Ver como Estudiante</span>
          </DropdownMenuItem>
          {isViewingAsOtherRole && (
            <DropdownMenuItem onClick={() => handleSwitchRole('original')} className="gap-2 text-yellow-600">
              <ShieldAlert className="h-4 w-4" />
              <span>Volver a mi rol</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RoleIndicator;
