
import React from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarFooterContentProps {
  viewAsRole: UserRoleType | 'current';
  onRoleChange: (role: UserRoleType) => void;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({
  viewAsRole,
  onRoleChange
}) => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  
  // Formato para iniciales del avatar
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };
  
  const handleRoleChange = (newRole: UserRoleType) => {
    console.log("SidebarFooterContent: handleRoleChange called with role:", newRole);
    onRoleChange(newRole);
  };
  
  return (
    <div className="flex flex-col gap-4">
      {/* Componente Role Switcher - Solo visible para admins */}
      {user && profile?.role === 'admin' && (
        <RoleSwitcher 
          currentViewRole={viewAsRole} 
          onChange={handleRoleChange} 
        />
      )}
      
      {/* Info de Usuario */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
            <AvatarImage src={profile?.avatar_url || undefined} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate max-w-[120px]">
              {profile?.full_name || user?.email?.split('@')[0] || 'Usuario'}
            </span>
            <span className="text-xs text-muted-foreground">
              {profile?.role || 'Estudiante'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooterContent;
