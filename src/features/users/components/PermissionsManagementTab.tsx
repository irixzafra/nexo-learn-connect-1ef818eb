
import React, { useState, useEffect } from 'react';
import { useRoles, Role } from '../hooks/useRoles';
import { usePermissions, Permission } from '../hooks/usePermissions';
import { useRolePermissions } from '../hooks/useRolePermissions';
import { Shield, Check, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export const PermissionsManagementTab: React.FC = () => {
  const { roles, isLoading: rolesLoading } = useRoles();
  const { permissionsByCategory, isLoading: permissionsLoading } = usePermissions();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const { hasPermission, togglePermission, isLoading: rolePermissionsLoading } = useRolePermissions(selectedRoleId || undefined);

  // Set the first role as selected by default
  useEffect(() => {
    if (roles.length > 0 && !selectedRoleId) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  const handlePermissionToggle = async (role: Role, permission: Permission) => {
    const currentlyHasPermission = hasPermission(permission.id);
    await togglePermission(role, permission, currentlyHasPermission);
  };

  const selectedRole = roles.find(role => role.id === selectedRoleId);
  const isLoading = rolesLoading || permissionsLoading || rolePermissionsLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Permisos</CardTitle>
        <CardDescription>
          Asigna permisos específicos a cada rol
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-12 gap-6">
          {/* Roles List - Left Sidebar */}
          <div className="md:col-span-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium mb-3">Roles</h3>
              {rolesLoading ? (
                // Loading skeleton for roles
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={`role-skeleton-${i}`} className="h-8 w-full mb-2" />
                ))
              ) : (
                roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={selectedRoleId === role.id ? "default" : "outline"}
                    className="w-full justify-start mb-1"
                    onClick={() => setSelectedRoleId(role.id)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="truncate">{role.name}</span>
                    {role.is_default && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        Default
                      </Badge>
                    )}
                  </Button>
                ))
              )}
            </div>
          </div>

          {/* Permissions Matrix - Right Panel */}
          <div className="md:col-span-9">
            {!selectedRole ? (
              <div className="flex items-center justify-center h-32 bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Selecciona un rol para gestionar sus permisos</p>
              </div>
            ) : isLoading ? (
              // Loading skeleton for permissions
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`category-skeleton-${i}`}>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={`perm-skeleton-${i}-${j}`} className="h-8 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">{selectedRole.name}</h2>
                  {selectedRole.is_default && (
                    <Badge variant="outline" className="ml-2">
                      Rol predeterminado
                    </Badge>
                  )}
                </div>
                
                {selectedRole.description && (
                  <p className="text-sm text-muted-foreground mb-6">
                    {selectedRole.description}
                  </p>
                )}
                
                <ScrollArea className="h-[450px] pr-4">
                  <div className="space-y-8">
                    {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                      <div key={category} className="space-y-4">
                        <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {permissions.map((permission) => {
                            const hasCurrentPermission = hasPermission(permission.id);
                            
                            return (
                              <div 
                                key={permission.id}
                                className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox 
                                  id={`permission-${permission.id}`}
                                  checked={hasCurrentPermission}
                                  onCheckedChange={() => handlePermissionToggle(selectedRole, permission)}
                                  disabled={selectedRole.name === 'admin'} // Admin always has all permissions
                                />
                                <div className="flex-1 grid gap-0.5">
                                  <label 
                                    htmlFor={`permission-${permission.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {permission.name}
                                  </label>
                                  {permission.description && (
                                    <p className="text-xs text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  )}
                                </div>
                                {selectedRole.name === 'admin' && (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                                {hasCurrentPermission && selectedRole.name !== 'admin' && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
