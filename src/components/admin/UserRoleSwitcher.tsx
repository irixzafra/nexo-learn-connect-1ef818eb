
import React, { useState, useEffect } from 'react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase';

interface RoleOption {
  id: string;
  name: string; 
  description: string | null;
}

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
  const [availableRoles, setAvailableRoles] = useState<RoleOption[]>([]);
  
  // Use the role from props if provided, otherwise use the context
  const currentRole = propCurrentRole || toUserRoleType(contextUserRole || 'student');
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(currentRole);
  const [isChanging, setIsChanging] = useState(false);
  
  useEffect(() => {
    // Cargar los roles disponibles desde la base de datos
    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('id, name, description')
          .order('name');
          
        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }
        
        setAvailableRoles(data || []);
      } catch (error) {
        console.error('Error loading roles:', error);
      }
    };
    
    fetchRoles();
  }, []);
  
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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              disabled={isChanging}
              className="h-8 w-8 rounded-full"
            >
              {isChanging ? (
                <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
              ) : (
                getRoleIcon(selectedRole)
              )}
              <span className="sr-only">Cambiar rol</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {availableRoles.map(role => (
              <DropdownMenuItem 
                key={role.id}
                onClick={() => handleRoleSelect(role.name as UserRoleType)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {getRoleIcon(role.name as UserRoleType)}
                  <span>{role.name}</span>
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
