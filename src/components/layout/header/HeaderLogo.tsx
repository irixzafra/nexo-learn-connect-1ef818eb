
import React from 'react';
import { Link } from 'react-router-dom';
import { NexoLogoIcon } from '@/components/ui/logo/nexo-logo-icon';
import { cn } from '@/lib/utils';
import { RoleIndicator } from './RoleIndicator';
import { UserRoleType } from '@/types/auth';

interface HeaderLogoProps {
  viewAsRole: UserRoleType | 'current';
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  viewAsRole
}) => {
  // Decide la URL de inicio según el rol
  const getHomeUrl = () => {
    if (viewAsRole === 'admin') return '/admin/dashboard';
    if (viewAsRole === 'instructor') return '/instructor/dashboard';
    return '/home';
  };

  return (
    <div className="flex items-center space-x-2">
      <Link 
        to={getHomeUrl()}
        className="flex items-center gap-2"
      >
        <NexoLogoIcon className="h-8 w-8" />
        <div className="flex flex-col">
          <span className="font-semibold text-sm sm:text-base leading-none">nexo</span>
          <span className="text-xs text-muted-foreground leading-none">ecosistema creativo</span>
        </div>
      </Link>
      
      {/* Indicador de rol */}
      {viewAsRole !== 'current' && (
        <RoleIndicator role={viewAsRole} />
      )}
    </div>
  );
};

export default HeaderLogo;
