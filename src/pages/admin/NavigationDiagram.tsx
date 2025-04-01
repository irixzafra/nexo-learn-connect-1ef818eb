
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
  Monitor,
  Smartphone,
  Sidebar,
  PanelTop,
  LayoutList,
  HomeIcon,
  HelpCircle,
  Settings,
  MessageSquare,
  Bell,
  BookOpen,
  FileText,
  Calendar,
  CreditCard,
  Shield
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { adminNavigation } from '@/config/navigation/adminNavigation';
import { settingsNavigation } from '@/config/navigation/settingsNavigation';

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

  // Convertir adminNavigation a un formato más simple para visualizar
  const adminRoutesFromConfig = adminNavigation.map(item => ({
    label: item.label,
    path: item.path
  }));

  // Convertir settingsNavigation a un formato más simple para visualizar
  const settingsRoutesFromConfig = settingsNavigation.map(item => ({
    label: item.label,
    path: item.path
  }));

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
      name: 'HeaderContent',
      description: 'Contenido principal del encabezado que muestra la información del usuario y controles de navegación.',
      filePath: 'src/components/layout/HeaderContent.tsx',
      role: 'Mostrar información y controles en el encabezado',
      status: 'active',
      type: 'header',
      usedIn: ['AppHeader']
    },
    {
      name: 'HeaderLogo',
      description: 'Componente del logo en el encabezado con opciones de navegación móvil.',
      filePath: 'src/components/layout/header/HeaderLogo.tsx',
      role: 'Mostrar logo y proporcionar navegación en móviles',
      status: 'active',
      type: 'header',
      usedIn: ['HeaderContent']
    },
    {
      name: 'UserMenu',
      description: 'Menú desplegable con opciones de usuario y controles de cuenta.',
      filePath: 'src/components/layout/header/UserMenu.tsx',
      role: 'Proporcionar acceso a opciones de usuario',
      status: 'active',
      type: 'menu',
      usedIn: ['HeaderContent']
    },
    {
      name: 'SidebarContent',
      description: 'Contenido principal de la barra lateral que muestra diferentes secciones de navegación.',
      filePath: 'src/components/layout/sidebar/SidebarContent.tsx',
      role: 'Mostrar opciones de navegación en la barra lateral',
      status: 'active',
      type: 'sidebar',
      usedIn: ['ConditionalSidebar']
    },
    {
      name: 'SidebarGroup',
      description: 'Grupo de elementos de navegación en la barra lateral con título plegable.',
      filePath: 'src/components/layout/sidebar/SidebarGroup.tsx',
      role: 'Agrupar elementos de navegación relacionados',
      status: 'active',
      type: 'sidebar',
      usedIn: ['SidebarContent']
    },
    {
      name: 'SidebarLogoSection',
      description: 'Sección superior de la barra lateral que muestra el logo de la aplicación.',
      filePath: 'src/components/layout/sidebar/SidebarLogoSection.tsx',
      role: 'Mostrar el logo en la barra lateral',
      status: 'active',
      type: 'sidebar',
      usedIn: ['ConditionalSidebar']
    },
    {
      name: 'SidebarFooterSection',
      description: 'Sección inferior de la barra lateral con opciones de usuario y configuración.',
      filePath: 'src/components/layout/sidebar/SidebarFooterSection.tsx',
      role: 'Mostrar opciones de configuración y usuario en la barra lateral',
      status: 'active',
      type: 'sidebar',
      usedIn: ['ConditionalSidebar']
    },
    {
      name: 'MainNavigationMenu',
      description: 'Menú de navegación principal en el encabezado con enlaces a secciones principales.',
      filePath: 'src/components/layout/header/MainNavigationMenu.tsx',
      role: 'Proporcionar navegación principal en el encabezado',
      status: 'active',
      type: 'menu',
      usedIn: ['HeaderContent']
    },
    {
      name: 'MobileSidebar',
      description: 'Barra lateral para dispositivos móviles que se muestra como un panel deslizable.',
      filePath: 'src/components/layout/header/MobileSidebar.tsx',
      role: 'Proporcionar navegación en dispositivos móviles',
      status: 'active',
      type: 'sidebar',
      usedIn: ['HeaderContent']
    },
    {
      name: 'SidebarNavItem',
      description: 'Elemento individual de navegación en la barra lateral.',
      filePath: 'src/components/layout/sidebar/navigation/SidebarNavItem.tsx',
      role: 'Mostrar un enlace individual en la navegación',
      status: 'active',
      type: 'navigation',
      usedIn: ['SidebarNavGroup']
    },
    {
      name: 'SidebarNavGroup',
      description: 'Grupo de elementos de navegación con título en la barra lateral.',
      filePath: 'src/components/layout/sidebar/navigation/SidebarNavGroup.tsx',
      role: 'Agrupar elementos de navegación relacionados',
      status: 'active',
      type: 'navigation',
      usedIn: ['SidebarNavSection']
    },
    {
      name: 'SidebarNavSection',
      description: 'Sección de navegación en la barra lateral que contiene grupos de elementos.',
      filePath: 'src/components/layout/sidebar/navigation/SidebarNavSection.tsx',
      role: 'Organizar grupos de navegación relacionados',
      status: 'active',
      type: 'navigation',
      usedIn: ['SidebarMainNavigation']
    },
    {
      name: 'SidebarSettingsMenu',
      description: 'Submenú de configuración en la barra lateral administrativa.',
      filePath: 'src/components/admin/SidebarSettingsMenu.tsx',
      role: 'Mostrar opciones de configuración en la administración',
      status: 'active',
      type: 'menu',
      usedIn: ['AdminNavigation']
    }
  ];

  // Lista de archivos de navegación por tipos
  const navigationFiles = {
    layouts: [
      'src/layouts/AdminLayout.tsx',
      'src/layouts/AppLayout.tsx'
    ],
    sidebars: [
      'src/components/layout/sidebar/SidebarContent.tsx',
      'src/components/admin/AdminNavigation.tsx',
      'src/components/layout/ConditionalSidebar.tsx'
    ],
    headers: [
      'src/components/layout/AppHeader.tsx',
      'src/components/layout/HeaderContent.tsx'
    ],
    footers: [
      'src/components/layout/SiteFooter.tsx'
    ],
    menus: [
      'src/components/layout/header/UserMenu.tsx',
      'src/components/layout/header/MainNavigationMenu.tsx',
      'src/components/admin/SidebarSettingsMenu.tsx'
    ],
    configs: [
      'src/config/navigation/adminNavigation.ts',
      'src/config/navigation/mainNavigation.ts',
      'src/config/navigation/settingsNavigation.ts'
    ]
  };

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
          <TabsTrigger value="files">Archivos</TabsTrigger>
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
                  {adminRoutesFromConfig.map((item, index) => (
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

        <TabsContent value="files" className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Archivos de Navegación
              </CardTitle>
              <CardDescription>
                Todos los archivos relacionados con la navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(navigationFiles).map(([category, files]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="font-medium capitalize">{category}</h3>
                    <div className="rounded-md border bg-muted/50">
                      <ul className="divide-y">
                        {files.map((file, index) => (
                          <li key={index} className="py-2 px-3 text-sm">
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Configuración de Navegación
              </CardTitle>
              <CardDescription>
                Archivos de configuración que definen la navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">adminNavigation.ts</h3>
                  <div className="rounded-md border bg-muted/50 p-3">
                    <p className="text-sm text-muted-foreground mb-2">Define la navegación del panel de administración</p>
                    <Badge>14 rutas</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">settingsNavigation.ts</h3>
                  <div className="rounded-md border bg-muted/50 p-3">
                    <p className="text-sm text-muted-foreground mb-2">Define las rutas de configuración</p>
                    <Badge>{settingsRoutesFromConfig.length} rutas</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">mainNavigation.ts</h3>
                  <div className="rounded-md border bg-muted/50 p-3">
                    <p className="text-sm text-muted-foreground mb-2">Define la navegación principal de la aplicación</p>
                    <Badge>8 rutas</Badge>
                  </div>
                </div>
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
                          <Menu className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium">SidebarMainNavigation</div>
                        </div>
                        
                        <div className="p-2 bg-background rounded-md border shadow-sm text-center">
                          <Menu className="h-5 w-5 mx-auto mb-1 text-primary" />
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
                      <span>SidebarSettingsMenu</span>
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
                Estás en la ruta <strong>/admin/navigation-diagram</strong>
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
