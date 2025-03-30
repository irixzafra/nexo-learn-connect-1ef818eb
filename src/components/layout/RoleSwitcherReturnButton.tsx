
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';
import { UserRoleType } from '@/types/auth';

interface RoleSwitcherReturnButtonProps {
  isViewingAsOtherRole: boolean;
  onRoleChange: (role: UserRoleType) => void;
  userRole: UserRoleType | null;
}

const RoleSwitcherReturnButton: React.FC<RoleSwitcherReturnButtonProps> = ({
  isViewingAsOtherRole,
  onRoleChange,
  userRole
}) => {
  if (!isViewingAsOtherRole || !userRole) return null;
  
  const handleReturn = () => {
    onRoleChange(userRole);
    // Also clear localStorage
    localStorage.setItem('viewAsRole', 'current');
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full flex items-center justify-center gap-1.5 text-xs bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
      onClick={handleReturn}
    >
      <ArrowLeftRight className="h-3 w-3" />
      <span className="truncate">Volver a mi rol</span>
    </Button>
  );
};

export default RoleSwitcherReturnButton;
