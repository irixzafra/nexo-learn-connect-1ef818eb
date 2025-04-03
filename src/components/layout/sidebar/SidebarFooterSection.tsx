
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { PowerIcon, BellIcon } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  currentViewRole: 'current' | UserRoleType;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (language: string) => void;
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  userRole,
  isCollapsed,
  effectiveRole,
  currentViewRole,
  handleRoleChange,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage,
}) => {
  const { logout } = useAuth();
  const unreadNotifications = 3; // Example count - replace with actual state

  return (
    <div className="mt-auto pt-2">
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center space-y-4 flex-col" : "justify-between px-3 pb-2"
      )}>
        {/* User Menu - Always at the left (or centered when collapsed) */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col space-y-3" : "space-x-2"
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={logout}
          >
            <PowerIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        
        {/* Tools Group - Always aligned (right or centered when collapsed) */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col space-y-3" : "space-x-2"
        )}>
          {/* Notifications Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full relative"
              >
                <BellIcon className="h-4 w-4 text-muted-foreground" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Notificaciones</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Language Selector */}
          <LanguageSelector variant={isCollapsed ? 'minimal' : 'icon'} />
          
          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SidebarFooterSection;
