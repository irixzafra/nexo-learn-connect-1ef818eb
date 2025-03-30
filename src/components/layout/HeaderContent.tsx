
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { HeaderActions } from './header/HeaderActions';
import { UserMenu } from './header/UserMenu';
import HeaderLogo from './header/HeaderLogo';
import MainNavigationMenu from './header/MainNavigationMenu';

interface HeaderContentProps {
  onRoleChange?: (role: UserRoleType) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ onRoleChange }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const isMobile = useIsMobile();
  
  // Convertir userRole a UserRoleType
  const userRoleType = toUserRoleType(userRole as string);

  // Example counter for unread messages
  const hasUnreadMessages = 3;

  return (
    <header className="w-full py-2 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 border-b">
      <div className="container mx-auto flex justify-between items-center h-14">
        <HeaderLogo 
          viewAsRole={userRoleType as UserRoleType | 'current'} 
        />
        
        <MainNavigationMenu 
          userRole={userRoleType} 
          hasUnreadMessages={hasUnreadMessages} 
        />
        
        <div className="flex items-center gap-2">
          <HeaderActions />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
