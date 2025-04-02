
import React from "react";
import { Users, Shield, Database, BarChart3 } from "lucide-react";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/shared/AdminNavTabs";
import { UsersListTab } from "@/features/users/components/UsersListTab";
import { RolesManagementTab } from "@/features/users/components/RolesManagementTab";
import { PermissionsManagementTab } from "@/features/users/components/PermissionsManagementTab";
import { UserAnalyticsTab } from "@/features/users/components/UserAnalyticsTab";

const UserManagement: React.FC = () => {
  // Create tabs array for AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-4 w-4" />,
      content: <UsersListTab />
    },
    {
      value: 'roles',
      label: 'Roles',
      icon: <Shield className="h-4 w-4" />,
      content: <RolesManagementTab />
    },
    {
      value: 'permissions',
      label: 'Permisos',
      icon: <Database className="h-4 w-4" />,
      content: <PermissionsManagementTab />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <UserAnalyticsTab />
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
