
import React, { useState } from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { Shield, BookOpen, GraduationCap, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface UserRoleSwitcherProps {
  userId?: string;
  currentRole?: UserRoleType;
  onRoleChange?: (userId: string, newRole: UserRoleType) => Promise<void>;
}

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ 
  userId,
  currentRole: propCurrentRole,
  onRoleChange
}) => {
  const { toast } = useToast();
  
  // Use the role from props as the current role
  const currentRole = propCurrentRole || 'student';
  const [isChanging, setIsChanging] = useState(false);
  
  const handleRoleChange = async (role: UserRoleType) => {
    if (role === currentRole || !userId || !onRoleChange) {
      return;
    }
    
    setIsChanging(true);
    
    try {
      await onRoleChange(userId, role);
      
      toast({
        title: "Rol actualizado",
        description: `El rol se ha cambiado a ${getRoleName(role)}`,
      });
    } catch (error) {
      console.error('Error changing role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cambiar el rol",
      });
    } finally {
      setIsChanging(false);
    }
  };

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <BookOpen className="h-4 w-4" />;
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getRoleName = (role: UserRoleType): string => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      default:
        return role;
    }
  };

  const availableRoles: UserRoleType[] = [
    'admin', 
    'instructor', 
    'student'
  ];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={isChanging}
              className="flex items-center gap-1"
            >
              {isChanging ? (
                <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
              ) : (
                <>
                  {getRoleIcon(currentRole)}
                  <span className="ml-1">{getRoleName(currentRole)}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {availableRoles.map((role) => (
              <DropdownMenuItem 
                key={role}
                onClick={() => handleRoleChange(role)}
                className="cursor-pointer"
                disabled={role === currentRole}
              >
                <div className="flex items-center gap-2">
                  {getRoleIcon(role)}
                  <span>{getRoleName(role)}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Cambiar rol</p>
      </TooltipContent>
    </Tooltip>
  );
};
