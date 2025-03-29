
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
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";

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

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="users-list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden md:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="add-user" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden md:inline">Añadir</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span className="hidden md:inline">Reportes</span>
          </TabsTrigger>
        </TabsList>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" className="ml-auto">
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

      <TabsContent value="reports" className="mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Reportes de Usuarios</h3>
          <p className="text-muted-foreground mb-6">
            Genera informes sobre actividad y registro de usuarios.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p>Sistema de reportes en desarrollo</p>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
