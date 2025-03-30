
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  ChevronRight, 
  Settings, 
  DatabaseIcon, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';

// Dashboard de Administración
const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Bienvenido al panel de control de administración</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/settings">
              <Settings className="h-4 w-4 mr-2" />
              Configuración del Sistema
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/users">
              <Users className="h-4 w-4 mr-2" />
              Gestionar Usuarios
            </Link>
          </Button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usuarios Totales</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cursos Activos</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ingresos del Mes</p>
              <p className="text-2xl font-bold">€4,850</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasa de Finalización</p>
              <p className="text-2xl font-bold">68%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accesos rápidos */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/users">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Gestión de Usuarios</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/settings">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configuración del Sistema</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/billing">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Facturación</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/admin/test-data">
                <div className="flex items-center">
                  <DatabaseIcon className="h-4 w-4 mr-2" />
                  <span>Datos de Prueba</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Alertas del sistema */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Alertas del Sistema</CardTitle>
            <CardDescription>Notificaciones recientes que requieren atención</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 p-4 rounded-md flex gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Actualización de Seguridad Pendiente</p>
                <p className="text-sm mt-1">Se recomienda actualizar los módulos de seguridad a la última versión.</p>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 p-4 rounded-md flex gap-2">
              <ShieldCheck className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Auditoría Completada</p>
                <p className="text-sm mt-1">La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
