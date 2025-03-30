
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-provider";
import HeaderContent from "@/components/layout/HeaderContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { connectionService } from "@/lib/offline/connectionService";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleIndicator } from "@/components/layout/header/RoleIndicator";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const { userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useState<'current' | string>('current');

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

  const handleRoleChange = (role: string) => {
    setViewAsRole(role);
  };

  return (
    <EditModeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col dark:bg-gray-950">
          <HeaderContent 
            viewAsRole={viewAsRole as any} 
            onRoleChange={handleRoleChange}
          />
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
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </EditModeProvider>
  );
};

export default AppLayout;
