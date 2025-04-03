
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarFooterSectionProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  currentViewRole: UserRoleType | null;
  getRoleName: (role: UserRoleType) => string;
  currentLanguage: string;
  languages: Array<{ code: string; name: string }>;
  changeLanguage: (code: string) => void;
  logout: () => Promise<void>;
  isViewingAsOtherRole: boolean;
  resetToOriginalRole: () => void;
  forceAdminRole?: () => Promise<void>; // Optional prop
}

const SidebarFooterSection: React.FC<SidebarFooterSectionProps> = ({
  userRole,
  effectiveRole,
  isCollapsed,
  currentViewRole,
  getRoleName,
  currentLanguage,
  languages,
  changeLanguage,
  logout,
  isViewingAsOtherRole,
  resetToOriginalRole,
  forceAdminRole
}) => {
  // Language selector
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLogout = async () => {
    await logout();
  };

  // Botón para activar el modo de simulación (SOLO PARA DEPURACIÓN)
  const handleTestRoleSimulation = () => {
    // Puedes ajustar esto según cómo hayas configurado setSimulatedRole
    if (window.confirm('¿Activar simulación de rol?')) {
      // Buscar un rol diferente al actual para simular
      const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student'];
      const differentRole = availableRoles.find(role => role !== userRole) || 'admin';
      
      // Esto debería estar disponible a través de AuthContext
      // pero como es solo para pruebas, lo hacemos simple
      localStorage.setItem('viewAsRole', differentRole);
      window.location.reload();
    }
  };

  if (isCollapsed) {
    return (
      <div className="mt-auto p-3 flex flex-col items-center space-y-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-auto p-3 space-y-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between rounded-lg border-muted bg-background/80 hover:bg-muted/20 transition-colors"
          >
            {selectedLanguage.name}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[180px] bg-popover shadow-md border border-border rounded-lg">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer rounded-md transition-colors",
                currentLanguage === lang.code ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Botón para activar/probar el modo de simulación (solo para depuración) */}
      <Button 
        variant="ghost" 
        onClick={handleTestRoleSimulation}
        className="w-full text-xs justify-start py-2 px-3 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-600 transition-colors"
        title="Esto es solo para pruebas"
      >
        <ShieldAlert className="mr-2 h-4 w-4 text-yellow-500" />
        Probar simulación rol
      </Button>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="w-full rounded-lg py-2 border-muted bg-background/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default SidebarFooterSection;
