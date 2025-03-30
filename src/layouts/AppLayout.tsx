
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
import { RoleIndicator } from "@/components/layout/header/RoleIndicator";
import { NexoLogo } from "@/components/ui/logo";
import { Home, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

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
          {/* Left Sidebar - Hidden on mobile */}
          <Sidebar className="border-r bg-sidebar hidden md:block">
            <SidebarContent className="p-0">
              <SidebarNavigation viewAsRole={viewAsRole} />
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top navigation bar */}
            <div className="h-16 border-b flex items-center justify-between px-4">
              <div className="flex items-center">
                {isMobile ? (
                  <SidebarTrigger className="hover:bg-transparent p-0 h-auto w-auto mr-2">
                    <NexoLogo variant="icon" className="h-8 w-auto cursor-pointer" />
                  </SidebarTrigger>
                ) : (
                  <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
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
              <div className="flex min-h-[calc(100vh-4rem)]">
                <div className="flex-1 overflow-auto pb-16 md:pb-0">
                  {children}
                </div>
              </div>
            </div>
            
            {/* Mobile Bottom Navigation */}
            {isMobile && (
              <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center h-16 z-50">
                <NavLink to="/home" className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center p-2 flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <Home className="h-5 w-5" />
                  <span className="text-xs mt-1">Inicio</span>
                </NavLink>
                
                <NavLink to="/courses" className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center p-2 flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="9" height="9" rx="2" />
                    <rect x="13" y="2" width="9" height="9" rx="2" />
                    <rect x="2" y="13" width="9" height="9" rx="2" />
                    <rect x="13" y="13" width="9" height="9" rx="2" />
                  </svg>
                  <span className="text-xs mt-1">Cursos</span>
                </NavLink>
                
                <NavLink to="/community" className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center p-2 flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="7" r="4" />
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
                  </svg>
                  <span className="text-xs mt-1">Comunidad</span>
                </NavLink>
                
                <NavLink to="/notifications" className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center p-2 flex-1 relative",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <Bell className="h-5 w-5" />
                  <span className="text-xs mt-1">Alertas</span>
                  <span className="absolute top-1 right-[calc(50%-10px)] flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                    3
                  </span>
                </NavLink>
                
                <NavLink to="/profile" className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center p-2 flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs mt-1">Perfil</span>
                </NavLink>
              </nav>
            )}
          </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </EditModeProvider>
  );
};

export default AppLayout;
