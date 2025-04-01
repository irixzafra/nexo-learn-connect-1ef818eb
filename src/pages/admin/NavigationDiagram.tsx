
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, ScanSearch, List } from 'lucide-react';

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
            <div className="flex items-center justify-center p-6 bg-muted rounded-md">
              <div className="flex flex-col items-center gap-2 text-center">
                <List className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Estás en la ruta <strong>/admin/navigation-diagram</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Este diagrama muestra las rutas ordenadas alfabéticamente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavigationDiagram;
