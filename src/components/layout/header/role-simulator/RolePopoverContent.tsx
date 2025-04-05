
import React from 'react';
import { Shield, Loader2, GraduationCap, UserCog, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { UserSearchResult } from './types';
import RoleBadge from './RoleBadge';

interface RolePopoverContentProps {
  effectiveRole: UserRoleType;
  isViewingAsOtherRole: boolean;
  userRole: UserRoleType | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userResults: UserSearchResult[];
  isSearching: boolean;
  handleSwitchRole: (role: UserRoleType) => void;
  resetToOriginalRole: () => void;
  handleClose: () => void;
  availableRoles: UserRoleType[];
}

const RolePopoverContent: React.FC<RolePopoverContentProps> = ({
  effectiveRole,
  isViewingAsOtherRole,
  userRole,
  searchQuery,
  setSearchQuery,
  userResults,
  isSearching,
  handleSwitchRole,
  resetToOriginalRole,
  handleClose,
  availableRoles
}) => {
  // Renderizar los botones para cada rol disponible
  const renderRoleButtons = () => {
    return availableRoles.map((role) => {
      let icon;
      switch (role) {
        case 'admin':
          icon = <Shield className="h-4 w-4" />;
          break;
        case 'instructor':
          icon = <UserCog className="h-4 w-4" />;
          break;
        case 'student':
          icon = <GraduationCap className="h-4 w-4" />;
          break;
        default:
          icon = null;
      }

      return (
        <Button
          key={role}
          variant={effectiveRole === role ? "secondary" : "ghost"}
          size="sm"
          className="w-full justify-start"
          onClick={() => {
            handleSwitchRole(role);
            handleClose();
          }}
        >
          {icon}
          <span className="ml-2 capitalize">{role}</span>
          {effectiveRole === role && (
            <span className="ml-auto text-xs bg-primary/20 px-2 py-0.5 rounded">Actual</span>
          )}
        </Button>
      );
    });
  };

  return (
    <div className="py-2">
      {/* Header - Title */}
      <div className="px-3 pb-2">
        <h3 className="text-sm font-medium">Cambiar Vista de Rol</h3>
        <p className="text-xs text-muted-foreground">Ver la aplicación con otro rol</p>
      </div>
      
      {/* Reset to original role button when viewing as other role */}
      {isViewingAsOtherRole && (
        <div className="px-2 pb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => {
              resetToOriginalRole();
              handleClose();
            }}
          >
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            <span>Volver a mi rol ({userRole})</span>
          </Button>
        </div>
      )}
      
      <Separator className="my-1" />
      
      {/* Role Buttons */}
      <div className="px-2 py-1 space-y-1">
        <p className="text-xs text-muted-foreground px-2">Roles del sistema</p>
        {renderRoleButtons()}
      </div>
      
      <Separator className="my-2" />
      
      {/* Search Users */}
      <div className="px-3 pt-1 pb-2">
        <p className="text-xs text-muted-foreground mb-2">Buscar usuario por nombre</p>
        <Input
          className="h-8 text-sm"
          placeholder="Nombre de usuario..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {/* Search Results */}
        <div className="mt-2 max-h-[180px] overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center items-center py-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="ml-2 text-xs text-muted-foreground">Buscando...</span>
            </div>
          ) : userResults.length > 0 ? (
            <div className="space-y-1">
              {userResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-2 py-1.5 hover:bg-muted rounded cursor-pointer"
                  onClick={() => {
                    handleSwitchRole(user.role as UserRoleType);
                    handleClose();
                  }}
                >
                  <span className="text-sm truncate max-w-[160px]">{user.full_name}</span>
                  <RoleBadge role={user.role as UserRoleType} />
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-2 text-xs text-muted-foreground">
              No se encontraron resultados
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RolePopoverContent;
