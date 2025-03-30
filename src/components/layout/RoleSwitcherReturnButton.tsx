
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { toast } from 'sonner';

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
    toast.success(`Volviendo a tu rol original: ${userRole}`);
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full flex items-center justify-center gap-1.5 text-xs bg-red-100 text-red-600 border-red-200 hover:bg-red-200 hover:text-red-700 hover:border-red-300"
      onClick={handleReturn}
    >
      <ArrowLeftRight className="h-3 w-3" />
      <span className="truncate">Volver a mi rol</span>
    </Button>
  );
};

export default RoleSwitcherReturnButton;
