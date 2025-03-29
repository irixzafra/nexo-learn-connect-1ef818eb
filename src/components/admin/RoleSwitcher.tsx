
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Shield, UserRound, ArrowLeftRight, UserCog, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserRoleSearch } from './UserRoleSearch';
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
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
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
        return <UserRound className="h-4 w-4" />;
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

  const handleSearchInputClick = () => {
    // Open the search dialog when clicking on the search input
    setOpen(false);
    setIsSearchDialogOpen(true);
  };

  return (
    <div className="px-2 py-1">
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
              placeholder="Buscar roles o usuarios..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="h-9"
              onClick={handleSearchInputClick}
            />
            
            <CommandList>
              <CommandEmpty>No se encontraron resultados</CommandEmpty>
              
              <CommandGroup heading="Cambiar vista">
                <CommandItem 
                  onSelect={() => handleRoleChange('admin')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Administrador</span>
                    </div>
                    {currentViewRole === 'admin' && <Check className="h-4 w-4" />}
                  </div>
                </CommandItem>
                
                <CommandItem 
                  onSelect={() => handleRoleChange('instructor')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <UserCog className="h-4 w-4 text-amber-500" />
                      <span>Instructor</span>
                    </div>
                    {currentViewRole === 'instructor' && <Check className="h-4 w-4" />}
                  </div>
                </CommandItem>
                
                <CommandItem 
                  onSelect={() => handleRoleChange('student')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-emerald-500" />
                      <span>Estudiante</span>
                    </div>
                    {currentViewRole === 'student' && <Check className="h-4 w-4" />}
                  </div>
                </CommandItem>
              </CommandGroup>
              
              {isViewingAsOtherRole && (
                <>
                  <Separator className="my-1" />
                  <CommandGroup heading="Acciones">
                    <CommandItem 
                      onSelect={() => handleRoleChange('current')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      <span>Volver a mi rol ({getRoleLabel(userRole as UserRole)})</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buscar usuarios</DialogTitle>
          </DialogHeader>
          <UserRoleSearch onClose={() => setIsSearchDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleSwitcher;
