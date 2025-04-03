
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Shield, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { RolePopoverContent } from './RolePopoverContent';
import { UserRoleType } from '@/types/auth';
import { getRoleName } from './roleUtils';

// Available roles for quick switcher
const AVAILABLE_ROLES: UserRoleType[] = [
  'admin',
  'instructor',
  'student',
  'moderator',
  'content_creator',
  'sistemas'
];

const EnhancedRoleSimulator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    profile,
    setSimulatedRole,
    resetToOriginalRole,
    effectiveRole,
    isViewingAsOtherRole,
    userRole
  } = useAuth();

  // No showing if no profile
  if (!profile) return null;

  const handleSwitchRole = (role: UserRoleType) => {
    setSimulatedRole(role);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // No results initially since we handle this in the UserSearch component
  const userResults = [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none"
        >
          <div className="flex items-center justify-center rounded-full bg-muted w-8 h-8 text-foreground font-semibold">
            {effectiveRole === 'admin' ? 'AD' : effectiveRole?.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-medium">{effectiveRole}</span>
            <span className="text-xs text-muted-foreground">{getRoleName(effectiveRole as UserRoleType)}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0" align="end">
        <RolePopoverContent
          effectiveRole={effectiveRole}
          isViewingAsOtherRole={isViewingAsOtherRole}
          userRole={userRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userResults={userResults}
          handleSwitchRole={handleSwitchRole}
          resetToOriginalRole={resetToOriginalRole}
          handleClose={handleClose}
          availableRoles={AVAILABLE_ROLES}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedRoleSimulator;
