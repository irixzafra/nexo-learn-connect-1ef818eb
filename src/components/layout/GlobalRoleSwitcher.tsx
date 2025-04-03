
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { toast } from 'sonner';

interface GlobalRoleSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

const GlobalRoleSwitcher: React.FC<GlobalRoleSwitcherProps> = ({ 
  className,
  showLabel = true
}) => {
  const { userRole, viewAsRole, setViewAsRole } = useAuth();
  
  // Si no es admin, no mostrar el componente
  if (userRole !== 'admin') {
    return null;
  }

  const handleRoleChange = (role: UserRoleType) => {
    setViewAsRole(role);
    toast.success(`Vista cambiada a: ${role}`);
  };

  return (
    <div className={className}>
      <RoleSwitcher 
        currentViewRole={viewAsRole} 
        onChange={handleRoleChange}
        showLabel={showLabel}
      />
    </div>
  );
};

export default GlobalRoleSwitcher;
