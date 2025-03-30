
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Shield, ArrowLeftRight, UserCog, User, Terminal, Ghost } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { toast } from 'sonner';

interface RoleSwitcherProps {
  onChange?: (role: UserRoleType) => void;
  currentViewRole: UserRoleType | 'current';
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Solo los administradores pueden cambiar roles
  if (userRole !== 'admin') {
    return null;
  }

  const getEffectiveRole = () => {
    if (currentViewRole === 'current') return toUserRoleType(userRole as string);
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const handleRoleChange = (role: UserRoleType | 'current') => {
    if (onChange) {
      if (role === 'current') {
        onChange(toUserRoleType(userRole as string));
        toast.success(`Volviendo a tu rol original: ${getRoleLabel(toUserRoleType(userRole as string))}`);
      } else {
        onChange(role);
        toast.success(`Cambiando vista a rol: ${getRoleLabel(role)}`);
      }
    }
    setOpen(false);
  };

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4 text-amber-500" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 text-blue-500" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4" />;
      case 'student':
      default:
        return <User className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getRoleLabel = (role: UserRoleType) => {
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

  // Roles disponibles para vista previa
  const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student', 'sistemas', 'anonimo'];
  
  // Filtrar roles basados en búsqueda
  const filteredRoles = availableRoles.filter(role => 
    role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleLabel(role).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isViewingAsOtherRole = currentViewRole !== 'current' && currentViewRole !== toUserRoleType(userRole as string);

  return (
    <div className="px-2 py-1 mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Vista previa como:</span>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            role="combobox"
            aria-expanded={open}
            className="flex w-full items-center justify-between p-2 h-auto"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6">
                {getRoleIcon(effectiveRole)}
              </div>
              <span className="font-medium">{getRoleLabel(effectiveRole)}</span>
              {isViewingAsOtherRole && (
                <Badge variant="outline" className="h-5 text-xs bg-amber-50 text-amber-800 border-amber-200">
                  Vista previa
                </Badge>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-0" sideOffset={4}>
          <Command>
            <CommandInput 
              placeholder="Buscar roles..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="h-9"
              autoFocus
            />
            
            <CommandList>
              <CommandEmpty>No se encontraron resultados</CommandEmpty>
              
              <CommandGroup heading="Cambiar vista">
                {filteredRoles.map((role) => (
                  <CommandItem 
                    key={role}
                    onSelect={() => handleRoleChange(role)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role)}
                        <span>{getRoleLabel(role)}</span>
                      </div>
                      {currentViewRole === role && <Check className="h-4 w-4" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              
              {isViewingAsOtherRole && (
                <>
                  <Separator className="my-1" />
                  <CommandGroup heading="Acciones">
                    <CommandItem 
                      onSelect={() => handleRoleChange('current')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeftRight className="h-4 w-4 mr-2" />
                      <span>Volver a mi rol ({getRoleLabel(toUserRoleType(userRole as string))})</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
