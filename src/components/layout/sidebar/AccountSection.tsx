
import React, { useState } from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { useAuth } from '@/contexts/auth';
import { User, LogOut, Settings, HelpCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AccountSectionProps {
  expanded: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
}

export const AccountSection: React.FC<AccountSectionProps> = ({ 
  expanded, 
  onToggle,
  isCollapsed 
}) => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  
  // Format user initials for avatar
  const getUserInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Sesión cerrada exitosamente");
      navigate('/auth/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("No se pudo cerrar sesión");
    }
  };
  
  // When sidebar is expanded, we display menu items directly
  // When collapsed, we show a user avatar with dropdown
  if (isCollapsed) {
    return (
      <div className="px-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || 'Usuario'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || 'Usuario'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium">{profile?.full_name || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground">{profile?.role || 'student'}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/help')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ayuda</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/about-us')}>
              <Info className="mr-2 h-4 w-4" />
              <span>Acerca de</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  
  return (
    <div className="mt-auto">
      <SidebarGroup
        label="Cuenta"
        icon={User}
        isExpanded={expanded}
        onToggle={onToggle}
      >
        <MenuItem to="/profile" icon={User} label="Mi Perfil" />
        <MenuItem to="/settings" icon={Settings} label="Configuración" />
        <MenuItem to="/help" icon={HelpCircle} label="Ayuda" />
        <MenuItem to="/about-us" icon={Info} label="Acerca de Nosotros" />
        
        {/* Logout button */}
        <div className="mt-2 px-3">
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </SidebarGroup>
    </div>
  );
};
