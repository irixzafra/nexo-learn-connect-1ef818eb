
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { UserRoleSwitcher } from './UserRoleSwitcher';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { user, profile, logout, userRole, setViewAsRole } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
      toast.success('Sesión cerrada con éxito');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };
  
  // Estado de modo claro/oscuro
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    // En un sistema real, aquí se implementaría la lógica para cambiar el tema
    toast.success(`Tema cambiado a ${theme === 'light' ? 'oscuro' : 'claro'}`);
  };
  
  // Obtener iniciales para avatar
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Determinar si mostrar selector de roles
  const showRoleSwitcher = userRole === 'admin' || userRole === 'instructor';
  
  return (
    <div className="border-t p-3">
      {/* Control de tema y selector de roles */}
      <div className={`mb-3 flex ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span className="sr-only">Cambiar tema</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? 'right' : 'top'}>
              <p>Cambiar tema</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
        
        {/* UserRoleSwitcher para admin e instructor */}
        {showRoleSwitcher && (
          <UserRoleSwitcher isCollapsed={isCollapsed} onRoleChange={setViewAsRole} />
        )}
      </div>
      
      {/* Información del usuario y botón de logout */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {isCollapsed ? (
          <div className="flex flex-col gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                          <AvatarImage src={profile?.avatar_url || undefined} />
                        </Avatar>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" side="right">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Mi Perfil</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Botón de cerrar sesión independiente y claramente visible */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-9 w-9 rounded-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Cerrar sesión</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                <AvatarImage src={profile?.avatar_url || undefined} />
              </Avatar>
              <div>
                <p className="truncate text-sm font-medium leading-none">
                  {profile?.full_name || user?.email?.split('@')[0] || 'Usuario'}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {userRole || 'student'}
                </p>
              </div>
            </div>
            
            {/* Botón de cerrar sesión claramente visible */}
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Salir</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
