
import React, { useEffect, useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  Activity, 
  Link2, 
  Settings,
  Award
} from 'lucide-react';
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, isLoading } = useAdminDashboardStats();
  const [activityValue, setActivityValue] = useState(0);
  
  useEffect(() => {
    // Simulamos que los datos de actividad tardan un poco más en cargarse
    if (!isLoading) {
      const timer = setTimeout(() => {
        setActivityValue(573);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  return (
    <AdminPageLayout
      title="Panel de Administración"
      subtitle="Gestión integral del sistema educativo"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
                  ) : stats?.total_users?.toLocaleString() || 0}
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12% desde el mes pasado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                  ) : stats?.total_courses?.toLocaleString() || 0}
                </div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+3 cursos nuevos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                  ) : `€${Math.floor(stats?.total_enrollments * 7).toLocaleString() || 0}`}
                </div>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+8.2% desde el mes pasado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {isLoading || activityValue === 0 ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                  ) : `+${activityValue}`}
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+201 inscripciones nuevas</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 relative">
            <CardHeader>
              <CardTitle>Gestión de Enlaces</CardTitle>
              <CardDescription>Monitorear y validar enlaces del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Herramientas para mantener la integridad de los enlaces en toda la plataforma.
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/link-dashboard')}
              >
                <Link2 className="h-4 w-4" />
                Centro de Enlaces
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 relative">
            <CardHeader>
              <CardTitle>Validación de Rutas</CardTitle>
              <CardDescription>Verificar rutas y solucionar problemas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Verificar la validez de las rutas del sistema y detectar problemas.
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/route-validator')}
              >
                <Settings className="h-4 w-4" />
                Validador de Rutas
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 relative">
            <Badge 
              variant="outline" 
              className="absolute top-3 right-3 bg-blue-100 text-blue-800 border-blue-200"
            >
              Desarrollo
            </Badge>
            <CardHeader>
              <CardTitle>Diagrama de Navegación</CardTitle>
              <CardDescription>Visualizar estructura de navegación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Ver la estructura de navegación de la plataforma de forma gráfica.
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/navigation-diagram')}
              >
                <Award className="h-4 w-4" />
                Ver Diagrama
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Actividades Recientes</CardTitle>
              <CardDescription>Seguimiento de actividades en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-6">
                <Badge 
                  variant="outline" 
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  Módulo en desarrollo
                </Badge>
              </div>
              <p className="text-muted-foreground text-center">
                El registro de actividades estará disponible próximamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default AdminDashboard;
