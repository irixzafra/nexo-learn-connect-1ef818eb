
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { UserRoleType } from '@/types/auth';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { adminMobileMenuItems } from '@/components/ui/admin-menu/AdminMenuPresets';
import { AdminMenuItem } from '@/components/ui/admin-menu/AdminMenu';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  User, 
  Phone,
  Shield
} from 'lucide-react';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  // Check if a role should see specific sections
  const canSeeAdmin = effectiveRole === 'admin' || effectiveRole === 'instructor';

  // Navegación simplificada - solo categorías principales
  const getNavigationItems = (): AdminMenuItem[] => {
    const baseItems = [
      {
        icon: Home,
        label: "Inicio",
        href: getHomePath(),
      },
      {
        icon: Compass,
        label: "Explorar",
        href: "/courses",
      },
      {
        icon: Users,
        label: "Comunidad",
        href: "/community",
      },
      {
        icon: MessageSquare,
        label: "Mensajes",
        href: "/messages",
        badge: messagesCount,
      }
    ];

    if (canSeeAdmin) {
      return [
        ...baseItems,
        {
          icon: Shield,
          label: "Administración",
          href: "/admin/dashboard",
        },
        {
          icon: User,
          label: "Perfil",
          href: "/profile",
          badge: notificationsCount,
        },
        {
          icon: Phone,
          label: "Contacto",
          href: "/contact",
        }
      ];
    }

    return [
      ...baseItems,
      {
        icon: User,
        label: "Perfil",
        href: "/profile",
        badge: notificationsCount,
      },
      {
        icon: Phone,
        label: "Contacto",
        href: "/contact",
      }
    ];
  };

  // Para administradores en versión móvil (colapsada)
  const getMobileAdminItems = (): AdminMenuItem[] => {
    if (effectiveRole === 'admin') {
      return adminMobileMenuItems;
    }
    
    // Para roles no admin, simplemente adaptar los items normales
    return getNavigationItems();
  };

  return (
    <div className={cn(
      "flex-1 overflow-auto",
      isCollapsed ? "px-2" : "px-4"
    )}>
      {isCollapsed ? (
        <>
          {/* Menú colapsado usando tooltips */}
          <div className="space-y-4 pt-4">
            {getMobileAdminItems().map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <div>
                    <AdminMenu 
                      items={[item]} 
                      variant="sidebar"
                      className="!space-y-0"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Search button for collapsed sidebar - only for admins */}
          {effectiveRole === 'admin' && (
            <div className="px-2 mt-6 flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={() => window.location.href = '/admin/users'}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Buscar usuarios</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </>
      ) : (
        // Menú expandido con AdminMenu
        <div className="space-y-1 pt-4">
          <AdminMenu 
            items={getNavigationItems()}
            variant="default"
          />
        </div>
      )}
    </div>
  );
};

export default SidebarMainNavigation;
