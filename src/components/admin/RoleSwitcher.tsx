
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';
import { ChevronRight, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface RoleSwitcherProps {
  onChange?: (role: UserRole) => void;
  currentViewRole: UserRole | 'current';
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole } = useAuth();
  
  // Only admins can switch roles
  if (userRole !== 'admin') {
    return null;
  }

  const getEffectiveRole = () => {
    if (currentViewRole === 'current') return userRole;
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const getRoleLabel = (role: UserRole | 'current') => {
    if (role === 'current') return userRole;
    return role;
  };

  const handleRoleChange = (role: UserRole | 'current') => {
    if (onChange) {
      onChange(role === 'current' ? userRole! : role);
    }
  };

  return (
    <div className="px-2 py-2">
      <Menubar className="border-0 bg-transparent p-0">
        <MenubarMenu>
          <MenubarTrigger className="flex w-full items-center justify-between rounded-md p-2 hover:bg-muted">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {effectiveRole ? effectiveRole.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium capitalize">
                  {effectiveRole}
                </span>
                {currentViewRole !== 'current' && (
                  <span className="text-xs text-muted-foreground">Vista previa</span>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent align="start" className="w-56">
            <MenubarItem 
              className={`flex items-center gap-2 ${currentViewRole === 'current' ? 'bg-muted' : ''}`}
              onClick={() => handleRoleChange('current')}
            >
              <UserRound className="h-4 w-4" />
              <span>Ver como: {getRoleLabel('current')}</span>
            </MenubarItem>
            <MenubarItem 
              className={`flex items-center gap-2 ${currentViewRole === 'student' ? 'bg-muted' : ''}`}
              onClick={() => handleRoleChange('student')}
            >
              <UserRound className="h-4 w-4" />
              <span>Ver como: Estudiante</span>
            </MenubarItem>
            <MenubarItem 
              className={`flex items-center gap-2 ${currentViewRole === 'instructor' ? 'bg-muted' : ''}`}
              onClick={() => handleRoleChange('instructor')}
            >
              <UserRound className="h-4 w-4" />
              <span>Ver como: Instructor</span>
            </MenubarItem>
            <MenubarItem 
              className={`flex items-center gap-2 ${currentViewRole === 'admin' ? 'bg-muted' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <UserRound className="h-4 w-4" />
              <span>Ver como: Admin</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default RoleSwitcher;
