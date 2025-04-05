
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { Search, X, RefreshCcw } from 'lucide-react';
import { RoleBadge } from './RoleBadge';
import { UserSearchResult } from './types';

interface RolePopoverContentProps {
  effectiveRole: UserRoleType | string;
  isViewingAsOtherRole: boolean;
  userRole: UserRoleType | string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userResults: UserSearchResult[];
  isSearching: boolean;
  handleSwitchRole: (role: UserRoleType) => void;
  resetToOriginalRole: () => void;
  handleClose: () => void;
  availableRoles: UserRoleType[];
}

export const RolePopoverContent: React.FC<RolePopoverContentProps> = ({
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
  return (
    <div className="text-sm">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold">Cambiar Rol</h3>
        <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {isViewingAsOtherRole && (
        <div className="p-3 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div>
            <p className="font-medium text-orange-800">Estás viendo como {effectiveRole}</p>
            <p className="text-xs text-orange-600">Tu rol real es {userRole}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetToOriginalRole} 
            className="h-8 text-xs border-orange-300 bg-white"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Volver
          </Button>
        </div>
      )}

      <Tabs defaultValue="roles" className="w-full">
        <div className="px-3 pt-3">
          <TabsList className="w-full">
            <TabsTrigger value="roles" className="flex-1">Roles</TabsTrigger>
            <TabsTrigger value="users" className="flex-1">Usuarios</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="roles" className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {availableRoles.map((role) => (
              <div
                key={role}
                className="flex justify-center"
                onClick={() => handleSwitchRole(role)}
              >
                <RoleBadge 
                  role={role} 
                  isSimulated={effectiveRole === role && isViewingAsOtherRole}
                  size="md"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="focus:outline-none">
          <div className="p-3 pb-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuario..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-52 mt-3">
            {isSearching ? (
              <div className="flex justify-center items-center py-8">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : userResults.length > 0 ? (
              <div className="px-3 space-y-1">
                {userResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => handleSwitchRole(toUserRoleType(user.role))}
                  >
                    <div>
                      <p className="font-medium">{user.full_name || 'Usuario sin nombre'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <RoleBadge role={toUserRoleType(user.role)} size="sm" />
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center text-muted-foreground">
                No se encontraron usuarios
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Busca por nombre o correo
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RolePopoverContent;
