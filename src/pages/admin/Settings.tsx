
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Settings as SettingsIcon, 
  Search, 
  LineChart,
  FileCode,
  LayoutDashboard
} from 'lucide-react';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Settings: React.FC = () => {
  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-6">
      <Helmet>
        <title>Configuración del Sistema | Admin</title>
      </Helmet>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Gestiona todos los aspectos de configuración de la plataforma.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar ajustes..."
              className="w-full pl-8"
            />
          </div>
          
          <Button variant="default" asChild>
            <Link to="/admin/navigation-diagram">
              <LineChart className="h-4 w-4 mr-2" />
              Ver Diagrama de Navegación
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5" />
              Sistema
            </CardTitle>
            <CardDescription>
              Configuración general del sistema y personalización.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/settings/features">
                Funcionalidades del sistema
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCode className="mr-2 h-5 w-5" />
              Desarrollo
            </CardTitle>
            <CardDescription>
              Herramientas para desarrollo y gestión técnica.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/settings/database">
                  Gestión de Base de Datos
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/navigation-diagram">
                  Diagrama de Navegación
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Administración
            </CardTitle>
            <CardDescription>
              Gestión de usuarios, roles y permisos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/settings/roles">
                Roles y Permisos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <SettingsTabs />
    </div>
  );
};

export default Settings;
