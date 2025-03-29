
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader 
} from '@/components/ui/sidebar';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { SidebarNavigation } from './SidebarNavigation';
import SidebarFooterContent from './SidebarFooterContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  const { user, profile } = useAuth();
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };
  
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center">
          <NexoLogo className="h-9 w-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <div className="mb-6 flex flex-col items-center text-center">
          <Button variant="ghost" className="h-auto p-0" asChild>
            <Link to="/profile">
              <Avatar className="h-16 w-16 mb-3 border-2 border-primary/20">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Link>
          </Button>
          <div className="space-y-1">
            <h3 className="font-medium truncate max-w-[160px]">
              {profile?.full_name || user?.email?.split('@')[0]}
            </h3>
            <p className="text-xs text-muted-foreground truncate max-w-[160px]">
              {user?.email}
            </p>
          </div>
        </div>
        
        <SidebarNavigation viewAsRole={viewAsRole} />
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <SidebarFooterContent 
          viewAsRole={viewAsRole} 
          onRoleChange={onRoleChange} 
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
