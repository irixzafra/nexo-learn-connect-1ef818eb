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
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/layout/header/UserMenu";
import { RoleIndicator } from "@/components/layout/header/RoleIndicator";
import { NexoLogo } from "@/components/ui/logo";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const { userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useState<'current' | UserRole>('current');

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
    setViewAsRole(role);
  };

  return (
    <EditModeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex dark:bg-gray-950 w-full">
          {/* Left Sidebar */}
          <Sidebar className="border-r bg-sidebar">
            <SidebarContent className="p-0">
              <SidebarNavigation viewAsRole={viewAsRole} />
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Minimal top bar with user menu and role indicator */}
            <div className="h-14 border-b flex items-center justify-end px-4">
              <div className="flex items-center gap-2">
                {isMobile && <SidebarTrigger className="md:hidden" />}
                {userRole && <RoleIndicator viewingAs={userRole} onRoleChange={handleRoleChange} />}
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
