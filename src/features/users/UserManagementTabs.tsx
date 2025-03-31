import React, { useState } from "react";
import { Card } from "@/components/ui/card";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import AdminNavTabs, { AdminTabItem } from "@/components/shared/AdminNavTabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { UserStats } from "./UserStats";

interface UserManagementTabsProps {
  isAdmin: boolean;
}

export const UserManagementTabs: React.FC<UserManagementTabsProps> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState("users-list");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

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

  const tabs: AdminTabItem[] = [
    {
      value: "users-list",
      label: !isSmallScreen ? "Usuarios" : "",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "roles",
      label: !isSmallScreen ? "Roles" : "",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      value: "analytics",
      label: !isSmallScreen ? "Analíticas" : "",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      value: "add-user",
      label: !isSmallScreen ? "Añadir" : "",
      icon: <UserPlus className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <AdminNavTabs 
          tabs={tabs}
          value={activeTab} 
          onValueChange={setActiveTab}
          showTabContent={false}
        />

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

      {/* Tab content */}
      {activeTab === "users-list" && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Lista de Usuarios</h3>
          <p className="text-muted-foreground mb-6">
            Esta sección muestra la lista de usuarios del sistema.
          </p>
        </Card>
      )}

      {activeTab === "roles" && (
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
      )}
      
      {activeTab === "analytics" && (
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
      )}

      {activeTab === "add-user" && (
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
      )}
    </div>
  );
};
