
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase';

interface RoleSwitcherProps {
  onChange?: (role: UserRoleType) => void;
  currentViewRole: UserRoleType | 'current';
}

interface DbRole {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole } = useAuth();
  const [availableRoles, setAvailableRoles] = useState<DbRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Solo los administradores pueden cambiar roles
  if (userRole !== 'admin') {
    return null;
  }

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        // Usar la función RPC que creamos
        const { data, error } = await supabase.rpc('get_available_roles');
        
        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }
        
        setAvailableRoles(data || []);
      } catch (error) {
        console.error('Error in fetchRoles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRoles();
  }, []);

  const getEffectiveRole = () => {
    if (currentViewRole === 'current') return toUserRoleType(userRole as string);
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const handleRoleChange = (role: UserRoleType | 'current') => {
    console.log("RoleSwitcher: handleRoleChange called with role:", role);
    
    if (onChange) {
      if (role === 'current') {
        const actualRole = toUserRoleType(userRole as string);
        onChange(actualRole);
        toast.success(`Volviendo a tu rol actual: ${getRoleName(actualRole)}`);
      } else {
        onChange(role);
        toast.success(`Viendo como: ${getRoleName(role)}`);
      }
    }
  };

  // Nombre legible para cada rol
  const getRoleName = (role: UserRoleType) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'moderator': return 'Moderador';
      case 'content_creator': return 'Creador de contenido';
      case 'sistemas': return 'Sistemas';
      case 'guest': return 'Invitado';
      case 'beta_tester': return 'Beta Tester';
      case 'anonimo': return 'Anónimo';
      default: return role;
    }
  };

  // Determinar si estamos viendo como otro rol
  const isViewingAsOtherRole = currentViewRole !== 'current' && currentViewRole !== toUserRoleType(userRole as string);

  return (
    <div className="px-3 mb-2">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={isViewingAsOtherRole ? "outline" : "outline"}
                size="sm" 
                className={cn(
                  "w-full justify-start text-left font-normal",
                  isViewingAsOtherRole && "bg-red-100 text-red-600 border-red-200 hover:bg-red-200 hover:text-red-700"
                )}
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                <span className="flex-1 truncate">
                  {isViewingAsOtherRole ? `Viendo como: ${getRoleName(effectiveRole)}` : `Ver como: ${getRoleName(effectiveRole)}`}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cambiar perspectiva de visualización</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem 
            onClick={() => handleRoleChange('current')}
            className="flex items-center"
          >
            {currentViewRole === 'current' && <Check className="h-4 w-4 mr-2" />}
            <span className="ml-6">Tu rol actual</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          {/* Lista de roles disponibles desde la base de datos */}
          {isLoading ? (
            <DropdownMenuItem disabled>Cargando roles...</DropdownMenuItem>
          ) : (
            availableRoles.map(role => (
              <DropdownMenuItem 
                key={role.id}
                onClick={() => handleRoleChange(role.name as UserRoleType)}
              >
                {effectiveRole === role.name && <Check className="h-4 w-4 mr-2" />}
                <div className="flex items-center ml-2">
                  <span>{role.name}</span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Helper function that I forgot to import
const cn = (...classes: (string | undefined | null | false | 0)[]) => {
  return classes.filter(Boolean).join(' ');
};
