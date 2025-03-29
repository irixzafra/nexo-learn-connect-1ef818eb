
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Shield, ArrowLeftRight, UserCog, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface RoleSwitcherProps {
  onChange?: (role: UserRole) => void;
  currentViewRole: UserRole | 'current';
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Solo los administradores pueden cambiar roles
  if (userRole !== 'admin') {
    return null;
  }

  const getEffectiveRole = () => {
    if (currentViewRole === 'current') return userRole;
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const handleRoleChange = (role: UserRole | 'current') => {
    if (onChange) {
      onChange(role === 'current' ? userRole! : role);
    }
    setOpen(false);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4 text-amber-500" />;
      case 'student':
        return <User className="h-4 w-4 text-emerald-500" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
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

  const isViewingAsOtherRole = currentViewRole !== 'current' && currentViewRole !== userRole;

  const filteredRoles = ['admin', 'instructor', 'student'].filter(role => 
    role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleLabel(role as UserRole).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {getRoleIcon(effectiveRole as UserRole)}
              </div>
              <span className="font-medium">{getRoleLabel(effectiveRole as UserRole)}</span>
              {isViewingAsOtherRole && (
                <Badge variant="outline" className="h-5 text-xs">
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
            />
            
            <CommandList>
              <CommandEmpty>No se encontraron resultados</CommandEmpty>
              
              <CommandGroup heading="Cambiar vista">
                {filteredRoles.map((role) => (
                  <CommandItem 
                    key={role}
                    onSelect={() => handleRoleChange(role as UserRole)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role as UserRole)}
                        <span>{getRoleLabel(role as UserRole)}</span>
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
                      <span>Volver a mi rol ({getRoleLabel(userRole as UserRole)})</span>
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

export default RoleSwitcher;
