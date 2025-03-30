
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { Shield, Users, UserCog, Terminal, User, Ghost } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarLogoSectionProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ 
  isCollapsed,
  toggleSidebar 
}) => {
  const { userRole, viewAsRole } = useAuth();
  
  const effectiveRole = viewAsRole === 'current' 
    ? toUserRoleType(userRole as string) 
    : viewAsRole;
  
  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'instructor':
        return <UserCog className="h-5 w-5 text-blue-500" />;
      case 'sistemas':
        return <Terminal className="h-5 w-5 text-purple-500" />;
      case 'anonimo':
        return <Ghost className="h-5 w-5 text-gray-400" />;
      case 'student':
      default:
        return <User className="h-5 w-5 text-green-500" />;
    }
  };
  
  const getRoleName = (role: UserRoleType): string => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };
  
  return (
    <div className="px-3 py-2">
      <Link 
        to="/" 
        className={cn(
          "flex items-center", 
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 relative">
                <span className="text-lg font-bold">N</span>
                <div className="absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center bg-white border-2 border-primary">
                  {getRoleIcon(effectiveRole)}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>nexo - {getRoleName(effectiveRole)}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <div className="flex items-center">
              <div className="relative mr-2">
                <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8">
                  <span className="text-lg font-bold">N</span>
                </div>
                <div className="absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center bg-white border-2 border-primary">
                  {getRoleIcon(effectiveRole)}
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">nexo</h1>
                <p className="text-xs text-muted-foreground">ecosistema creativo</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
              className="rounded-full p-1 hover:bg-muted transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </Link>
    </div>
  );
};

export default SidebarLogoSection;
