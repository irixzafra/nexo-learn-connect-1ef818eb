
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, ScanSearch, List, Navigation, Navigation2, Globe } from 'lucide-react';

type NavigationItem = {
  label: string;
  path: string;
};

const NavigationDiagram: React.FC = () => {
  // Menú de la imagen, ordenado alfabéticamente
  const menuItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'DynamicPage', path: '/dynamic' },
    { label: 'FeatureSettings', path: '/features' },
    { label: 'GeneralSettings', path: '/' },
    { label: 'Index', path: '/' },
    { label: 'LandingPage', path: '/landing' },
    { label: 'Login', path: '/login' },
    { label: 'PaymentCancel', path: '/payment/cancel' },
    { label: 'PaymentSuccess', path: '/payment/success' },
    { label: 'PlaceholderPage', path: '/placeholder' },
    { label: 'ProfilePage', path: '/profile' },
    { label: 'Register', path: '/register' },
  ];

  // Rutas administrativas disponibles
  const adminRoutes: NavigationItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Usuarios', path: '/admin/users' },
    { label: 'Cursos', path: '/admin/courses' },
    { label: 'Configuración', path: '/admin/settings' },
    { label: 'Features', path: '/admin/settings/features' },
    { label: 'Tema', path: '/admin/settings/theme' },
    { label: 'Integraciones', path: '/admin/settings/integrations' },
    { label: 'Roles', path: '/admin/settings/roles' },
    { label: 'Base de Datos', path: '/admin/settings/database' },
    { label: 'Datos de Prueba', path: '/admin/test-data' },
    { label: 'Diagrama de Navegación', path: '/admin/navigation-diagram' },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Diagrama de Navegación</h1>
      <p className="text-muted-foreground mb-6">
        Esta herramienta muestra la estructura de navegación de la aplicación.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              Navegación Principal
            </CardTitle>
            <CardDescription>
              Estructura de navegación para usuarios regulares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <ul className="divide-y">
                {menuItems.map((item, index) => (
                  <li key={index} className="flex justify-between py-3 px-4">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.path}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanSearch className="h-5 w-5 text-primary" />
              Navegación Administrativa
            </CardTitle>
            <CardDescription>
              Estructura de navegación para administradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <ul className="divide-y">
                {adminRoutes.map((item, index) => (
                  <li key={index} className="flex justify-between py-3 px-4">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.path}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Información de la página actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 bg-muted rounded-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <Navigation2 className="h-10 w-10 text-primary" />
              <p className="text-muted-foreground">
                Estás en la ruta <strong>/admin/navigation-diagram</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Esta página proporciona una visión general de todas las rutas disponibles en la aplicación
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationDiagram;
