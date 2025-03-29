
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface RoleSwitcherReturnButtonProps {
  isViewingAsOtherRole: boolean;
  onRoleChange: (role: UserRole) => void;
  userRole: UserRole | null;
}

const RoleSwitcherReturnButton: React.FC<RoleSwitcherReturnButtonProps> = ({
  isViewingAsOtherRole,
  onRoleChange,
  userRole
}) => {
  if (!isViewingAsOtherRole) return null;
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mt-2 w-full flex items-center gap-2 text-xs"
      onClick={() => onRoleChange(userRole as UserRole)}
    >
      <ArrowLeftRight className="h-3 w-3" />
      <span>Volver a mi rol</span>
    </Button>
  );
};

export default RoleSwitcherReturnButton;
