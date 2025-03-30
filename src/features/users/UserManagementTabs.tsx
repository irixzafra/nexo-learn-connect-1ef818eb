
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { UserRoleSearch } from "@/components/admin/UserRoleSearch";
import { Button } from "@/components/ui/button";
import { 
  Users,
  UserCog, 
  ShieldCheck, 
  UserPlus, 
  FileSpreadsheet,
  Download,
  BarChart,
  LineChart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { UserStats } from "./UserStats";
import { useMediaQuery } from "@/hooks/use-media-query";

interface UserManagementTabsProps {
  isAdmin: boolean;
}

export const UserManagementTabs: React.FC<UserManagementTabsProps> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState("users-list");

  if (!isAdmin) {
    return (
      <div className="p-6 bg-muted/50 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Acceso restringido</h3>
        <p className="text-muted-foreground">
          No tienes permisos suficientes para acceder a la gestión de usuarios.
        </p>
      </div>
    );
  }

  // Datos simulados para las estadísticas
  const stats = {
    totalUsers: 1250,
    activeUsers: 892,
    newUsers: 47,
    inactiveUsers: 125,
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="users-list" className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Usuarios</span>
          </TabsTrigger>
          
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <span>Roles</span>
          </TabsTrigger>
          
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            <span>Analíticas</span>
          </TabsTrigger>
          
          <TabsTrigger value="add-user" className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            <span>Añadir</span>
          </TabsTrigger>
        </TabsList>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      <TabsContent value="users-list" className="mt-0 border-none">
        {/* Users list content will be handled by the main component */}
      </TabsContent>

      <TabsContent value="roles" className="mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Gestión de Roles</h3>
          <p className="text-muted-foreground mb-6">
            Esta sección permite configurar los roles de usuario y sus permisos asociados.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <UserCog className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p>Funcionalidad en desarrollo</p>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Analíticas de Usuarios</h3>
          <p className="text-muted-foreground mb-6">
            Estadísticas y tendencias sobre los usuarios en la plataforma.
          </p>
          
          <UserStats 
            totalUsers={stats.totalUsers}
            activeUsers={stats.activeUsers}
            newUsers={stats.newUsers}
            inactiveUsers={stats.inactiveUsers}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="font-medium mb-3">Distribución de Roles</h4>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                <LineChart className="h-12 w-12 text-muted-foreground" />
                <p className="ml-2">Gráfico en desarrollo</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-medium mb-3">Actividad de Usuarios</h4>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded">
                <BarChart className="h-12 w-12 text-muted-foreground" />
                <p className="ml-2">Gráfico en desarrollo</p>
              </div>
            </Card>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="add-user" className="mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Añadir Nuevo Usuario</h3>
          <p className="text-muted-foreground mb-6">
            Crea una nueva cuenta de usuario e invítalo a la plataforma.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p>Formulario de creación en desarrollo</p>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
