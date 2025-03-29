
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido a nexo learn</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Perfil del usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Mi Perfil</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Nombre:</span> {profile?.full_name || user?.email?.split('@')[0]}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Rol:</span> {profile?.role || 'No asignado'}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Mis Cursos */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Cursos</CardTitle>
              <CardDescription>Continúa tu aprendizaje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-muted rounded-full">
                <div className="h-2 w-1/3 bg-primary rounded-full"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">33% completado en total</p>
            </CardContent>
          </Card>
          
          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Tu historial de actividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm">Iniciaste sesión en el sistema</p>
                    <p className="text-xs text-muted-foreground">Justo ahora</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
