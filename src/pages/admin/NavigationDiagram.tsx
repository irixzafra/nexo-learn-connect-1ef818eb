import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Route, 
  ScanSearch, 
  Navigation, 
  Navigation2, 
  Globe, 
  LayoutDashboard,
  Users,
  Menu,
  Menu as MenuIcon,
  Monitor,
  Smartphone,
  Sidebar,
  PanelTop,
  LucideFooter,
  LayoutList
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type NavigationItem = {
  label: string;
  path: string;
};

type NavigationComponent = {
  name: string;
  description: string;
  filePath: string;
  role: string;
  status: 'active' | 'development' | 'deprecated';
  type: 'sidebar' | 'header' | 'footer' | 'menu' | 'navigation' | 'layout';
  usedIn: string[];
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

  // Componentes de navegación del sistema
  const navigationComponents: NavigationComponent[] = [
    {
      name: 'AdminNavigation',
      description: 'Barra lateral de navegación para la sección administrativa. Muestra enlaces a las diferentes secciones del panel de administración.',
      filePath: 'src/components/admin/AdminNavigation.tsx',
      role: 'Mostrar opciones de navegación administrativa',
      status: 'active',
      type: 'sidebar',
      usedIn: ['AdminLayout', 'admin/*']
    },
    {
      name: 'AppHeader',
      description: 'Cabecera principal de la aplicación. Contiene el logo, menú de usuario, notificaciones y controles globales.',
      filePath: 'src/components/layout/AppHeader.tsx',
      role: 'Mostrar información y controles globales en la parte superior',
      status: 'active',
      type: 'header',
      usedIn: ['AppLayout', 'todas las páginas regulares']
    },
    {
      name: 'SidebarNavigation',
      description: 'Navegación lateral principal que cambia según el rol del usuario. Contiene enlaces a las diferentes secciones de la aplicación.',
      filePath: 'src/components/layout/SidebarNavigation.tsx',
      role: 'Mostrar opciones de navegación principales',
      status: 'active',
      type: 'sidebar',
      usedIn: ['AppLayout', 'todas las páginas regulares']
    },
    {
      name: 'ConditionalSidebar',
      description: 'Componente que determina qué navegación mostrar según la ruta actual. Alterna entre navegación regular y administrativa.',
      filePath: 'src/components/layout/ConditionalSidebar.tsx',
      role: 'Alternar entre diferentes tipos de navegación según el contexto',
      status: 'active',
      type: 'navigation',
      usedIn: ['SidebarNavigation']
    },
    {
      name: 'SidebarMainNavigation',
      description: 'Componente de navegación principal para usuarios regulares. Muestra diferentes opciones según el rol del usuario.',
      filePath: 'src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx',
      role: 'Mostrar navegación principal para usuarios regulares',
      status: 'active',
      type: 'sidebar',
      usedIn: ['ConditionalSidebar']
    },
    {
      name: 'SiteFooter',
      description: 'Pie de página con enlaces legales, de contacto y otra información general.',
      filePath: 'src/components/layout/SiteFooter.tsx',
      role: 'Mostrar información legal y enlaces de contacto',
      status: 'active',
      type: 'footer',
      usedIn: ['AppLayout', 'todas las páginas regulares']
    },
    {
      name: 'MobileNavMenu',
      description: 'Menú de navegación para dispositivos móviles. Se muestra como un menú desplegable desde un botón en la cabecera.',
      filePath: 'src/components/layout/MobileNavMenu.tsx',
      role: 'Proporcionar navegación en dispositivos móviles',
      status: 'active',
      type: 'menu',
      usedIn: ['AppLayout', 'dispositivos móviles']
    },
    {
      name: 'CursosNavigation',
      description: 'Navegación específica para la sección de cursos. Muestra enlaces a diferentes aspectos de los cursos.',
      filePath: 'src/components/layout/sidebar/navigation/CursosNavigation.tsx',
      role: 'Mostrar opciones de navegación para la sección de cursos',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'DashboardNavigation',
      description: 'Navegación específica para el dashboard. Muestra enlaces a diferentes aspectos del panel de control.',
      filePath: 'src/components/layout/sidebar/navigation/DashboardNavigation.tsx',
      role: 'Mostrar opciones de navegación para el dashboard',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'ComunidadNavigation',
      description: 'Navegación específica para la sección de comunidad. Muestra enlaces a foros, mensajes, etc.',
      filePath: 'src/components/layout/sidebar/navigation/ComunidadNavigation.tsx',
      role: 'Mostrar opciones de navegación para la sección de comunidad',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'ConfiguracionNavigation',
      description: 'Navegación específica para la sección de configuración. Muestra enlaces a diferentes ajustes.',
      filePath: 'src/components/layout/sidebar/navigation/ConfiguracionNavigation.tsx',
      role: 'Mostrar opciones de navegación para la configuración',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'CalendarNavigation',
      description: 'Navegación específica para la sección de calendario. Muestra enlaces a diferentes vistas del calendario.',
      filePath: 'src/components/layout/sidebar/navigation/CalendarNavigation.tsx',
      role: 'Mostrar opciones de navegación para el calendario',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'GamificationNavigation',
      description: 'Navegación específica para la sección de gamificación. Muestra enlaces a logros, desafíos, etc.',
      filePath: 'src/components/layout/sidebar/navigation/GamificationNavigation.tsx',
      role: 'Mostrar opciones de navegación para la gamificación',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'AdminMenu',
      description: 'Componente de menú administrativo que puede mostrarse en diferentes formatos (botones, tarjetas, etc).',
      filePath: 'src/components/ui/admin-menu/AdminMenu.tsx',
      role: 'Mostrar menú administrativo en diferentes formatos',
      status: 'active',
      type: 'menu',
      usedIn: ['admin/*']
    },
    {
      name: 'AppLayout',
      description: 'Layout principal de la aplicación. Contiene el sidebar, header y estructura básica.',
      filePath: 'src/layouts/AppLayout.tsx',
      role: 'Definir la estructura básica de páginas regulares',
      status: 'active',
      type: 'layout',
      usedIn: ['pages regulares']
    },
    {
      name: 'AdminLayout',
      description: 'Layout específico para la sección administrativa. Contiene la barra lateral administrativa.',
      filePath: 'src/layouts/AdminLayout.tsx',
      role: 'Definir la estructura básica de páginas administrativas',
      status: 'active',
      type: 'layout',
      usedIn: ['páginas administrativas']
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Diagrama de Navegación</h1>
      <p className="text-muted-foreground mb-6">
        Esta herramienta muestra la estructura completa de navegación de la aplicación, incluyendo todos los componentes y sus relaciones.
      </p>
      
      <Tabs defaultValue="components" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="components">Componentes de Navegación</TabsTrigger>
          <TabsTrigger value="routes">Rutas de Navegación</TabsTrigger>
          <TabsTrigger value="diagram">Diagrama Visual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutList className="h-5 w-5 text-primary" />
                Componentes de Navegación
              </CardTitle>
              <CardDescription>
                Todos los componentes que forman parte del sistema de navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {navigationComponents.map((component, index) => (
                  <div key={index} className="border rounded-md p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {component.name}
                          <Badge variant={component.status === 'active' ? 'default' : component.status === 'development' ? 'outline' : 'destructive'}>
                            {component.status}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:text-right">
                        <Badge variant="outline" className="whitespace-nowrap">{component.type}</Badge>
                        <Badge variant="secondary" className="whitespace-nowrap">{component.filePath}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t flex flex-col gap-1">
                      <div className="flex flex-wrap gap-1 text-sm">
                        <span className="font-medium">Función:</span> 
                        <span className="text-muted-foreground">{component.role}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-sm">
                        <span className="font-medium">Usado en:</span> 
                        <span className="text-muted-foreground">{component.usedIn.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="routes" className="grid gap-6 md:grid-cols-2">
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
        </TabsContent>
        
        <TabsContent value="diagram" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Diagrama de Estructura de Navegación
              </CardTitle>
              <CardDescription>
                Visualización jerárquica de los componentes de navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto p-4 bg-muted rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-background rounded-md border shadow-sm text-center mb-4">
                    <PanelTop className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold mb-1">AppLayout</div>
                    <div className="text-xs text-muted-foreground">Contenedor principal</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
                    <div className="p-3 bg-background rounded-md border shadow-sm text-center">
                      <Sidebar className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">SidebarNavigation</div>
                      <div className="text-xs text-muted-foreground">Navegación lateral</div>
                    </div>
                    
                    <div className="p-3 bg-background rounded-md border shadow-sm text-center">
                      <PanelTop className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">AppHeader</div>
                      <div className="text-xs text-muted-foreground">Cabecera</div>
                    </div>
                    
                    <div className="p-3 bg-background rounded-md border shadow-sm text-center">
                      <Menu className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold mb-1">SiteFooter</div>
                      <div className="text-xs text-muted-foreground">Pie de página</div>
                    </div>
                  </div>
                  
                  <div className="border-l-2 h-8 border-dashed"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                    <div className="space-y-2">
                      <div className="p-3 bg-background rounded-md border shadow-sm text-center">
                        <Monitor className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold mb-1">Escritorio</div>
                        <div className="text-xs text-muted-foreground">ConditionalSidebar</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-background rounded-md border shadow-sm text-center">
                          <MenuIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium">SidebarMainNavigation</div>
                        </div>
                        
                        <div className="p-2 bg-background rounded-md border shadow-sm text-center">
                          <MenuIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium">AdminNavigation</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="p-3 bg-background rounded-md border shadow-sm text-center">
                        <Smartphone className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold mb-1">Móvil</div>
                        <div className="text-xs text-muted-foreground">MobileNavMenu</div>
                      </div>
                      
                      <div className="p-2 bg-background rounded-md border shadow-sm text-center">
                        <Menu className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <div className="text-xs font-medium">Menú Responsive</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                Menús de Navegación por Sección
              </CardTitle>
              <CardDescription>
                Componentes de navegación específicos por contexto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Dashboard</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>DashboardNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Estadísticas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Actividad</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Cursos</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>CursosNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Oferta Académica</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Rutas de Aprendizaje</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Comunidad</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>ComunidadNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Mensajes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Notificaciones</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Configuración</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>ConfiguracionNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Ajustes de Cuenta</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Preferencias</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Calendario</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>CalendarNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Mi Calendario</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Programación</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Gamificación</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>GamificationNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Logros</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Desafíos</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-md border">
                  <h3 className="font-medium mb-2">Administración</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>AdminLayout</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>AdminNavigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>AdminMenu</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
                Estás en la ruta <strong>/admin/analytics</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Desde esta página puedes revisar todos los componentes de navegación del sistema y decidir cuáles mantener y cuáles eliminar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationDiagram;
