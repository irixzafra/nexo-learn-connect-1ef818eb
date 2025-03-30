
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Shield, UserCog, User, Terminal, Ghost } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface RoleIndicatorProps {
  viewingAs?: UserRoleType | 'current';
  onRoleChange?: (role: UserRoleType) => void;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ 
  viewingAs,
  onRoleChange
}) => {
  const { toast } = useToast();
  const { userRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(
    (viewingAs && viewingAs !== 'current') ? toUserRoleType(viewingAs as string) : toUserRoleType(userRole as string)
  );
  
  const getRoleInfo = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return { label: 'Admin', color: 'bg-yellow-500 hover:bg-yellow-600', icon: <Shield className="h-3 w-3 mr-1" /> };
      case 'instructor':
        return { label: 'Instructor', color: 'bg-blue-500 hover:bg-blue-600', icon: <UserCog className="h-3 w-3 mr-1" /> };
      case 'student':
        return { label: 'Estudiante', color: 'bg-green-500 hover:bg-green-600', icon: <User className="h-3 w-3 mr-1" /> };
      case 'sistemas':
        return { label: 'Sistemas', color: 'bg-purple-500 hover:bg-purple-600', icon: <Terminal className="h-3 w-3 mr-1" /> };
      case 'anonimo':
        return { label: 'Anónimo', color: 'bg-gray-500 hover:bg-gray-600', icon: <Ghost className="h-3 w-3 mr-1" /> };
      default:
        return { label: role.toString(), color: 'bg-neutral-500 hover:bg-neutral-600', icon: null };
    }
  };
  
  const handleRoleChange = (role: UserRoleType) => {
    setSelectedRole(role);
    
    if (onRoleChange) {
      onRoleChange(role);
    } else {
      toast({
        title: "Modo de vista cambiado",
        description: `Ahora estás viendo la aplicación como ${getRoleInfo(role).label}`,
      });
    }
  };
  
  const currentRole = viewingAs === 'current' ? toUserRoleType(userRole as string) : toUserRoleType(viewingAs as string);
  const { label, color, icon } = getRoleInfo(selectedRole);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge 
          className={cn(
            "cursor-pointer transition-colors flex items-center gap-1",
            color
          )}
          variant="outline"
        >
          {icon}
          {label}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleRoleChange('admin')} className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Administrador</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange('instructor')} className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          <span>Instructor</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange('sistemas')} className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>Sistemas</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange('student')} className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Estudiante</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange('anonimo')} className="flex items-center gap-2">
          <Ghost className="h-4 w-4" />
          <span>Anónimo</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
