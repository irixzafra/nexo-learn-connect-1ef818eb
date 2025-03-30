
import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementTab } from '@/features/admin/components/users/UserManagementTab';
import { RoleManagementTab } from '@/features/admin/components/users/RoleManagementTab';

const AccessControl: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Control de Acceso",
        description: "Gestiona los permisos y roles de los usuarios"
      }}
    >
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6">
          <UserManagementTab />
        </TabsContent>
        
        <TabsContent value="roles" className="mt-6">
          <RoleManagementTab />
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

export default AccessControl;
