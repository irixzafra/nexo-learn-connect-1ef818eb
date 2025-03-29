
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-provider";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import HeaderContent from "@/components/layout/HeaderContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { connectionService } from "@/lib/offline/connectionService";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    return unsubscribe;
  }, []);

  // Simular la detección de transición entre páginas
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <EditModeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex dark:bg-gray-950">
          <SidebarNavigation />
          <main className="flex flex-col flex-1 min-h-screen">
            <HeaderContent />
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
              {children}
            </div>
          </main>
          <Toaster />
        </div>
      </SidebarProvider>
    </EditModeProvider>
  );
};

export default AppLayout;
