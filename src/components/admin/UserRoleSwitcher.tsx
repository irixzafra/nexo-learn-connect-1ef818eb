
import React, { useState } from 'react';
import { UserRoleType, toUserRoleType, asUserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { UserCog, Shield, User, Terminal, Ghost, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { userRole: contextUserRole, user } = useAuth();
  const { toast } = useToast();
  
  // Use the role from props if provided, otherwise use the context
  const currentRole = propCurrentRole || toUserRoleType(contextUserRole || 'student');
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(currentRole);
  const [isChanging, setIsChanging] = useState(false);
  
  const handleRoleSelect = (role: UserRoleType) => {
    setSelectedRole(role);
    handleChange(role);
  };
  
  const handleChange = async (roleToSet: UserRoleType = selectedRole) => {
    if (roleToSet === currentRole) {
      return;
    }
    
    setIsChanging(true);
    
    try {
      if (onRoleChange && userId) {
        // Use the provided callback if available
        await onRoleChange(userId, roleToSet);
      } else {
        // This is for view-mode switching only (doesn't change actual role in DB)
        toast({
          title: "Modo de vista cambiado",
          description: `Ahora estás viendo la aplicación como ${roleToSet}`,
        });
        
        // You might want to update some context or state here
        // This is just a visual change and doesn't modify the database
      }
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
        return <UserCog className="h-4 w-4" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4" />;
      case 'student':
        return <User className="h-4 w-4" />;
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
      case 'sistemas':
        return 'Sistemas'; 
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={isChanging ? "outline" : "default"}
            size="sm"
            disabled={isChanging}
            className="flex items-center gap-2"
          >
            {isChanging ? (
              <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
            ) : (
              getRoleIcon(selectedRole)
            )}
            <span>{getRoleName(selectedRole)}</span>
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(['admin', 'instructor', 'student', 'sistemas', 'anonimo'] as UserRoleType[]).map((role) => (
            <DropdownMenuItem 
              key={role}
              onClick={() => handleRoleSelect(role)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {getRoleIcon(role)}
                <span>{getRoleName(role)}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
