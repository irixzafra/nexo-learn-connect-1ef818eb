
import React from 'react';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { useAuth } from '@/contexts/auth';

interface RoleSwitcherHeaderProps {
  className?: string;
}

const RoleSwitcherHeader: React.FC<RoleSwitcherHeaderProps> = ({ className }) => {
  const { userRole } = useAuth();
  
  // Si no es admin, no mostrar el componente
  if (userRole !== 'admin') {
    return null;
  }

  return <RoleSwitcher className={className} />;
};

export default RoleSwitcherHeader;
