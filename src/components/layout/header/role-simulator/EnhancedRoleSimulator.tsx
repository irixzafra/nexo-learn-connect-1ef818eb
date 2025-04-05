
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, UserCog, GraduationCap, Shield, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student'];

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {isViewingAsOtherRole && !compact && (
        <div className="text-xs text-muted-foreground mb-1 text-center">
          Vista como:
        </div>
      )}
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size={compact ? "sm" : "default"}
            className={cn(
              "relative w-full justify-between",
              isViewingAsOtherRole && "border-primary/40 bg-primary/5"
            )}
          >
            <div className="flex items-center gap-1.5 truncate">
              {getRoleIcon(effectiveRole as UserRoleType)}
              {!compact && (
                <span className="truncate">
                  {getRoleName(effectiveRole as UserRoleType)}
                </span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          <div className="text-xs font-medium text-muted-foreground px-2 pt-1 pb-2">
            Ver como:
          </div>
          
          {availableRoles.map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => handleRoleChange(role)}
              disabled={role === effectiveRole}
              className={cn(
                "cursor-pointer flex items-center gap-2",
                role === effectiveRole && "bg-accent text-accent-foreground font-medium"
              )}
            >
              {getRoleIcon(role)}
              <span>{getRoleName(role)}</span>
            </DropdownMenuItem>
          ))}
          
          {isViewingAsOtherRole && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleResetRole} className="cursor-pointer">
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                <span>Restaurar rol original</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EnhancedRoleSimulator;
