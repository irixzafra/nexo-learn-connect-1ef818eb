
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Search, Shield, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserRoleSearch } from './UserRoleSearch';
import { cn } from '@/lib/utils';

interface RoleSwitcherProps {
  onChange?: (role: UserRole) => void;
  currentViewRole: UserRole | 'current';
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole } = useAuth();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
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
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserRound className="h-4 w-4 text-amber-500" />;
      case 'student':
        return <UserRound className="h-4 w-4 text-emerald-500" />;
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

  return (
    <div className="px-2 py-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Vista previa como:</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsSearchDialogOpen(true)}>
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar usuarios</span>
        </Button>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex w-full items-center justify-between p-2 h-auto"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6">
                {getRoleIcon(effectiveRole as UserRole)}
              </div>
              <span className="font-medium">{getRoleLabel(effectiveRole as UserRole)}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-2">
          <div className="flex flex-col gap-1">
            <Button 
              variant="ghost" 
              className={cn(
                "flex justify-start items-center gap-2 h-9", 
                currentViewRole === 'admin' && "bg-accent"
              )}
              onClick={() => handleRoleChange('admin')}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Administrador</span>
                </div>
                {currentViewRole === 'admin' && <Check className="h-4 w-4" />}
              </div>
            </Button>
            
            <Button 
              variant="ghost" 
              className={cn(
                "flex justify-start items-center gap-2 h-9", 
                currentViewRole === 'instructor' && "bg-accent"
              )}
              onClick={() => handleRoleChange('instructor')}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-amber-500" />
                  <span>Instructor</span>
                </div>
                {currentViewRole === 'instructor' && <Check className="h-4 w-4" />}
              </div>
            </Button>
            
            <Button 
              variant="ghost" 
              className={cn(
                "flex justify-start items-center gap-2 h-9", 
                currentViewRole === 'student' && "bg-accent"
              )}
              onClick={() => handleRoleChange('student')}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-emerald-500" />
                  <span>Estudiante</span>
                </div>
                {currentViewRole === 'student' && <Check className="h-4 w-4" />}
              </div>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cambiar rol de usuario</DialogTitle>
          </DialogHeader>
          <UserRoleSearch onClose={() => setIsSearchDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleSwitcher;
