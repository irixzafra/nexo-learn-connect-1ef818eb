
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Settings: React.FC = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Configuración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Página en desarrollo - Más opciones vendrán próximamente</p>
              </CardContent>
            </Card>
          </div>
          
          {isAdmin && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Herramientas de Administración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Cambiar Rol de Vista</h3>
                    <UserRoleSwitcher />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
