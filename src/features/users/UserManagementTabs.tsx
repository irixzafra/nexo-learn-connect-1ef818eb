
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Users, Shield } from 'lucide-react';
import { UsersListTab } from './components/UsersListTab';
import { RolesManagementTab } from './components/RolesManagementTab';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import AdminNavTabs from '@/components/shared/AdminNavTabs';

interface UserManagementTabsProps {
  isAdmin?: boolean;
}

export const UserManagementTabs: React.FC<UserManagementTabsProps> = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState('users');
  
  const tabs: AdminTabItem[] = [
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-4 w-4" />,
      content: <UsersListTab />
    },
    {
      value: 'roles',
      label: 'Roles y Permisos',
      icon: <Shield className="h-4 w-4" />,
      content: <RolesManagementTab />
    }
  ];

  return (
    <AdminNavTabs
      tabs={tabs}
      defaultValue="users"
      value={activeTab}
      onValueChange={setActiveTab}
    />
  );
};
