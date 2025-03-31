
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType } from '@/types/auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Shield, UserCog, User, Ghost } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface UserRoleSwitcherProps {
  isCollapsed: boolean;
  onRoleChange: (role: UserRoleType) => void;
}

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ 
  isCollapsed,
  onRoleChange
}) => {
  const { userRole } = useAuth();
  
  const handleRoleChange = (role: UserRoleType) => {
    onRoleChange(role);
    toast.success(`Vista cambiada a: ${getRoleName(role)}`);
  };
  
  const getRoleName = (role: UserRoleType): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'guest': return 'Invitado';
      default: return role;
    }
  };
  
  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4 text-red-500" />;
      case 'instructor': return <UserCog className="h-4 w-4 text-blue-500" />;
      case 'guest': return <Ghost className="h-4 w-4 text-gray-500" />;
      case 'student': 
      default: return <User className="h-4 w-4 text-green-500" />;
    }
  };
  
  // Solo mostrar roles relevantes según el rol actual
  const availableRoles: UserRoleType[] = (() => {
    if (userRole === 'admin') {
      return ['admin', 'instructor', 'student', 'guest'];
    }
    if (userRole === 'instructor') {
      return ['instructor', 'student'];
    }
    return [userRole as UserRoleType];
  })();
  
  if (availableRoles.length <= 1) return null;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon">
                {getRoleIcon(userRole as UserRoleType)}
                <span className="sr-only">Cambiar vista de rol</span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCollapsed ? "center" : "end"} side={isCollapsed ? "right" : "top"}>
            {availableRoles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => handleRoleChange(role)}
                className="cursor-pointer flex items-center gap-2"
              >
                {getRoleIcon(role)}
                <span>{getRoleName(role)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side={isCollapsed ? "right" : "top"}>
        <p>Cambiar vista de rol</p>
      </TooltipContent>
    </Tooltip>
  );
};
