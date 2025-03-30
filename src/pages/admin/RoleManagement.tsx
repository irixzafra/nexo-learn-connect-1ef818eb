
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRolesTable from '@/components/admin/roles/UserRolesTable';
import RoleManagementSearch from '@/components/admin/roles/RoleManagementSearch';
import { useRoleManagement } from '@/hooks/useRoleManagement';

const RoleManagement: React.FC = () => {
  const { users, isLoading, searchTerm, setSearchTerm, handleRoleChange } = useRoleManagement();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Roles</CardTitle>
        <CardDescription>
          Administra los roles y permisos de los usuarios de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RoleManagementSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <UserRolesTable 
          users={users} 
          isLoading={isLoading} 
          handleRoleChange={handleRoleChange} 
        />
      </CardContent>
    </Card>
  );
};

export default function RoleManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Roles y Permisos</h1>
      <RoleManagement />
    </div>
  );
}
