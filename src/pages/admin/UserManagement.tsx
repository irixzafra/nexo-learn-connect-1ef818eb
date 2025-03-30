
import React from "react";
import { Users, Shield, Database, BarChart3 } from "lucide-react";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/admin/AdminTabs";
import { UserManagementList } from "@/features/users/UserManagementList";
import { RoleManagement } from "@/features/users/RoleManagement";
import { PermissionsManagement } from "@/features/users/PermissionsManagement";
import { UserAnalytics } from "@/features/users/UserAnalytics";
import { useUserManagement } from "@/features/users/useUserManagement";

const UserManagement: React.FC = () => {
  const {
    users,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleRoleChange,
  } = useUserManagement();

  // Create tabs array for AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-4 w-4" />,
      content: (
        <UserManagementList 
          users={users}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onRoleChange={handleRoleChange}
        />
      )
    },
    {
      value: 'roles',
      label: 'Roles',
      icon: <Shield className="h-4 w-4" />,
      content: <RoleManagement />
    },
    {
      value: 'permissions',
      label: 'Permisos',
      icon: <Database className="h-4 w-4" />,
      content: <PermissionsManagement />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <UserAnalytics />
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios, roles y permisos de la plataforma"
      tabs={tabs}
      defaultTabValue="users"
    />
  );
};

export default UserManagement;
