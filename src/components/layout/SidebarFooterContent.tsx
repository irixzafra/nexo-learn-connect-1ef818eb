
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import RoleSwitcher from '@/components/admin/RoleSwitcher';
import EditModeToggle from '@/components/admin/EditModeToggle';
import { UserRole } from '@/types/auth';

type ViewAsRole = UserRole | 'current';

interface SidebarFooterContentProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({ 
  viewAsRole, 
  onRoleChange 
}) => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <>
      {userRole === 'admin' && (
        <div className="mb-4">
          <RoleSwitcher 
            currentViewRole={viewAsRole}
            onChange={onRoleChange}
          />
        </div>
      )}

      <div className="flex justify-between items-center p-2">
        {userRole === 'admin' && <EditModeToggle />}
        
        <Button 
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full ml-auto"
          onClick={handleLogout}
          title="Cerrar Sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default SidebarFooterContent;
