
import React from 'react';
import { Users, Shield, Settings, Database } from 'lucide-react';
import AdminTabs, { AdminTabItem } from './AdminTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminTabsExample: React.FC = () => {
  // Example tabs configuration
  const tabs: AdminTabItem[] = [
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-5 w-5" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>Administrar usuarios del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenido del panel de usuarios...</p>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'roles',
      label: 'Roles',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Roles</CardTitle>
            <CardDescription>Administrar roles de usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenido del panel de roles...</p>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'permissions',
      label: 'Permisos',
      icon: <Database className="h-5 w-5" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Permisos</CardTitle>
            <CardDescription>Administrar permisos del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenido del panel de permisos...</p>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'settings',
      label: 'Configuración',
      icon: <Settings className="h-5 w-5" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>Configuración del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Contenido del panel de configuración...</p>
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Administración de Usuarios</h2>
      <AdminTabs 
        tabs={tabs} 
        defaultValue="users" 
      />
      
      <h3 className="text-xl font-bold mt-10">Variant: Vertical Tabs</h3>
      <div className="flex gap-6">
        <AdminTabs 
          tabs={tabs.slice(0, 3)} 
          defaultValue="users" 
          orientation="vertical"
          className="max-w-[200px]"
        />
      </div>
      
      <h3 className="text-xl font-bold mt-10">Variant: Icon Position Top</h3>
      <AdminTabs 
        tabs={tabs} 
        defaultValue="users"
        iconPosition="top"
      />
    </div>
  );
};

export default AdminTabsExample;
