
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { connectionService } from "@/lib/offline/connectionService";
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import { UserRole } from "@/types/auth";
import { 
  Sidebar, 
  SidebarTrigger, 
  SidebarContent,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/layout/header/UserMenu";
import { NexoLogo } from "@/components/ui/logo";
import { NotificationIndicator } from "@/components/notifications/NotificationIndicator";
import { ThemeSelector } from "@/components/ThemeSelector";
import MobileNavMenu from "@/components/layout/MobileNavMenu";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const { userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useState<'current' | UserRole>(() => {
    // Try to get the saved role from localStorage
    const savedRole = localStorage.getItem('viewAsRole');
    if (savedRole && (savedRole === 'current' || ['admin', 'instructor', 'student', 'sistemas', 'anonimo'].includes(savedRole))) {
      return savedRole as 'current' | UserRole;
    }
    return 'current';
  });

  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [children]);

  const handleRoleChange = (role: UserRole) => {
    console.log("Changing role to:", role);
    setViewAsRole(role);
    localStorage.setItem('viewAsRole', role);
  };

  return (
    <EditModeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex dark:bg-gray-950 w-full">
          {/* Left Sidebar - Hidden in mobile */}
          <Sidebar className="border-r bg-sidebar hidden md:flex">
            <SidebarContent className="p-0">
              <SidebarNavigation viewAsRole={viewAsRole} onRoleChange={handleRoleChange} />
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top bar with menu trigger, logo, user menu */}
            <div className="h-14 border-b flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                {/* Trigger móvil */}
                <div className="md:hidden">
                  <MobileNavMenu userRole={userRole} />
                </div>
                
                {/* Logo en la versión móvil */}
                <div className="md:hidden">
                  <NexoLogo variant="icon" className="h-8 w-auto" />
                </div>
                
                {/* Trigger desktop */}
                <div className="hidden md:block">
                  <SidebarTrigger className="hover:bg-transparent p-0 h-auto w-auto" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                {/* Theme Selector */}
                <ThemeSelector />
                
                {/* Notification Icon */}
                <NotificationIndicator />
                
                <UserMenu />
              </div>
            </div>
            
            <div
              className={cn(
                "flex-1 transition-all duration-200 ease-in-out",
                isPageTransitioning ? "opacity-70" : "opacity-100",
                className
              )}
            >
              {!isOnline && (
                <div className="bg-yellow-100 dark:bg-yellow-950 border-b border-yellow-200 dark:border-yellow-900 p-2 text-sm text-center text-yellow-800 dark:text-yellow-400">
                  Modo offline activado. Algunas funciones pueden estar limitadas hasta que se restablezca la conexión.
                </div>
              )}
              <div className="flex min-h-screen">
                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </EditModeProvider>
  );
};

export default AppLayout;
