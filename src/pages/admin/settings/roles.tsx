
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Key, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RoleManagement } from '@/features/users/RoleManagement';
import { PermissionsManagement } from '@/features/users/PermissionsManagement';
import { UserRoleAssignment } from '@/features/users/components/UserRoleAssignment';

const RolesAndPermissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');

  return (
    <AdminPageLayout 
      title="Roles y Permisos" 
      subtitle="Administra los roles de usuario y sus permisos en el sistema"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Gestión de Roles y Permisos</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Lock className="mr-2 h-4 w-4" />
                Comprobar Permisos
              </Button>
            </div>
            <CardDescription>
              Define y personaliza los roles de usuario y sus capacidades en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger value="roles">
                  <Shield className="mr-2 h-4 w-4" />
                  Roles
                </TabsTrigger>
                <TabsTrigger value="permissions">
                  <Key className="mr-2 h-4 w-4" />
                  Permisos
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  Usuarios
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="roles" className="space-y-4">
                <RoleManagement />
              </TabsContent>
              
              <TabsContent value="permissions" className="space-y-4">
                <PermissionsManagement />
              </TabsContent>
              
              <TabsContent value="users" className="space-y-4">
                <UserRoleAssignment />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default RolesAndPermissions;
