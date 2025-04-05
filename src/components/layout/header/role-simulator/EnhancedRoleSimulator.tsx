
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, UserCog, GraduationCap, Shield, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserSearch } from '@/hooks/useUserSearch';
import RolePopoverContent from './RolePopoverContent';

interface EnhancedRoleSimulatorProps {
  className?: string;
  compact?: boolean;
}

const EnhancedRoleSimulator: React.FC<EnhancedRoleSimulatorProps> = ({ 
  className,
  compact = false 
}) => {
  const { userRole, effectiveRole, setSimulatedRole, isViewingAsOtherRole, resetToOriginalRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Use our updated hook with the correct return type
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    noResults,
  } = useUserSearch();

  if (!userRole || userRole !== 'admin') return null;

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4" />;
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
      case 'sistemas':
        return 'Sistemas';
      case 'moderator':
        return 'Moderador';
      case 'content_creator':
        return 'Creador de Contenido';
      case 'guest':
        return 'Invitado';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  const handleRoleChange = (role: UserRoleType) => {
    console.log("Changing role to:", role);
    if (setSimulatedRole) {
      setSimulatedRole(role);
    }
    setIsOpen(false);
  };

  const handleResetRole = () => {
    console.log("Resetting to original role");
    if (resetToOriginalRole) {
      resetToOriginalRole();
    }
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student'];

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {isViewingAsOtherRole && !compact && (
        <div className="text-xs text-muted-foreground mb-1 px-2">
          Vista como:
        </div>
      )}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size={compact ? "sm" : "default"}
            className={cn(
              "relative w-full justify-between",
              isViewingAsOtherRole && "border-primary/40 bg-primary/5"
            )}
          >
            <div className="flex items-center gap-2 truncate">
              {getRoleIcon(effectiveRole as UserRoleType)}
              {!compact && (
                <span className="truncate">
                  {getRoleName(effectiveRole as UserRoleType)}
                </span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-64 p-0">
          <RolePopoverContent
            effectiveRole={effectiveRole as UserRoleType}
            isViewingAsOtherRole={isViewingAsOtherRole || false}
            userRole={userRole}
            searchQuery={searchTerm}
            setSearchQuery={setSearchTerm}
            userResults={searchResults}
            isSearching={isSearching}
            handleSwitchRole={handleRoleChange}
            resetToOriginalRole={handleResetRole}
            handleClose={handleClose}
            availableRoles={availableRoles}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EnhancedRoleSimulator;
