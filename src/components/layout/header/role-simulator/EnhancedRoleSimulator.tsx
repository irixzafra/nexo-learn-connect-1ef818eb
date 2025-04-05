
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
import RoleBadge from './RoleBadge';

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
              <RoleBadge role={effectiveRole as UserRoleType} showText={!compact} size={compact ? "sm" : "md"} />
              {/* La leyenda de "Vista como:" no es necesaria en botón cuando es compacto */}
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
