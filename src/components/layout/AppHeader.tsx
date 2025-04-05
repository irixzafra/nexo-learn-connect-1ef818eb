
import React from 'react';
import { UserMenu } from './header/UserMenu';
import HeaderActions from './header/HeaderActions';
import HeaderLogo from './header/HeaderLogo';
import { BreadcrumbHeader } from './header/BreadcrumbHeader';
import RoleIndicator from './header/RoleIndicator';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ className }) => {
  return (
    <header className={cn("flex flex-col border-b bg-background/95 backdrop-blur-sm", className)}>
      <div className="h-16 flex items-center px-4 gap-4">
        <HeaderLogo />
        <div className="flex-1">
          <BreadcrumbHeader className="hidden md:block" />
        </div>
        <div className="flex items-center gap-2">
          <RoleIndicator />
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
