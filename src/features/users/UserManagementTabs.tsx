
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users,
  UserCog, 
  Shield, 
  UserPlus, 
  FileSpreadsheet,
  Download,
  BarChart,
  LineChart
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import AdminNavTabs, { AdminTabItem } from "@/components/shared/AdminNavTabs";
import { cn } from "@/lib/utils";
import { UserStats } from "./UserStats";
import { UsersListTab } from "./components/UsersListTab";
import { RolesListTab } from "./components/RolesListTab";

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
      icon: <Shield className="h-4 w-4" />,
    },
    {
      value: "analytics",
      label: !isSmallScreen ? "Analíticas" : "",
      icon: <BarChart className="h-4 w-4" />,
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

        <div className="flex items-center gap-2">
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

      {/* Tab content */}
      {activeTab === "users-list" && <UsersListTab />}

      {activeTab === "roles" && <RolesListTab />}
      
      {activeTab === "analytics" && (
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Analíticas de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};
