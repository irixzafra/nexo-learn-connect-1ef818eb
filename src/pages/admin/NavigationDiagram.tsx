
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getNavigationByRole } from '@/config/navigation';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface NavComponent {
  id: string;
  name: string;
  description: string;
  filePath: string;
  type: 'container' | 'section' | 'admin' | 'config';
  showsOn: string[];
  childrenOf?: string;
  isVisible?: boolean;
}

const NavigationDiagram: React.FC = () => {
  // Navigation components organized by type
  const navComponents: NavComponent[] = [
    // Main container components
    {
      id: 'sidebar-navigation',
      name: 'SidebarNavigation',
      description: 'Main container for all sidebar elements',
      filePath: 'src/components/layout/SidebarNavigation.tsx',
      type: 'container',
      showsOn: ['All routes except login/register'],
    },
    {
      id: 'conditional-sidebar',
      name: 'ConditionalSidebar',
      description: 'Controls which sidebar to show based on route (admin vs regular)',
      filePath: 'src/components/layout/ConditionalSidebar.tsx',
      type: 'container',
      showsOn: ['All routes except login/register'],
    },
    {
      id: 'sidebar-main-navigation',
      name: 'SidebarMainNavigation',
      description: 'Main navigation sections for regular users',
      filePath: 'src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx',
      type: 'container',
      showsOn: ['All non-admin routes'],
      childrenOf: 'conditional-sidebar',
    },
    {
      id: 'admin-navigation',
      name: 'AdminNavigation',
      description: 'Specialized navigation for admin routes',
      filePath: 'src/components/admin/AdminNavigation.tsx',
      type: 'admin',
      showsOn: ['/admin/*'],
      childrenOf: 'conditional-sidebar',
    },
    {
      id: 'conditional-header',
      name: 'ConditionalHeader',
      description: 'Header with mobile menu toggle for non-admin pages',
      filePath: 'src/components/layout/header/ConditionalHeader.tsx',
      type: 'container',
      showsOn: ['All non-admin routes'],
    },
    {
      id: 'main-navigation-menu',
      name: 'MainNavigationMenu',
      description: 'Old horizontal navigation (currently returns null)',
      filePath: 'src/components/layout/header/MainNavigationMenu.tsx',
      type: 'container',
      showsOn: ['None - returns null'],
    },
    
    // Navigation Section Components
    {
      id: 'sidebar-logo-section',
      name: 'SidebarLogoSection',
      description: 'Logo section at top of sidebar',
      filePath: 'src/components/layout/sidebar/SidebarLogoSection.tsx',
      type: 'section',
      showsOn: ['All routes with sidebar'],
      childrenOf: 'conditional-sidebar',
    },
    {
      id: 'sidebar-footer-section',
      name: 'SidebarFooterSection',
      description: 'Footer with language selector, theme toggle, role switcher',
      filePath: 'src/components/layout/sidebar/SidebarFooterSection.tsx',
      type: 'section',
      showsOn: ['All routes with sidebar'],
      childrenOf: 'conditional-sidebar',
    },
    
    // Specific navigation groups
    {
      id: 'general-section',
      name: 'GeneralSection',
      description: 'Main navigation links (Home, Explore, etc.)',
      filePath: 'src/components/layout/sidebar/GeneralSection.tsx',
      type: 'section',
      showsOn: ['All non-admin routes'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'community-section',
      name: 'CommunitySection',
      description: 'Community links (Messages, Network)',
      filePath: 'src/components/layout/sidebar/CommunitySection.tsx',
      type: 'section',
      showsOn: ['All non-admin routes'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'learning-section',
      name: 'LearningSection',
      description: 'Learning links (Scholarships, Profile, Settings)',
      filePath: 'src/components/layout/sidebar/LearningSection.tsx',
      type: 'section',
      showsOn: ['All non-admin routes'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'instructor-section',
      name: 'InstructorSection',
      description: 'Instructor panel links (Dashboard, Courses, Students)',
      filePath: 'src/components/layout/sidebar/InstructorSection.tsx',
      type: 'section',
      showsOn: ['For users with instructor, admin roles'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'account-section',
      name: 'AccountSection',
      description: 'Account-related links',
      filePath: 'src/components/layout/sidebar/AccountSection.tsx',
      type: 'section',
      showsOn: ['All routes with sidebar'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'sidebar-settings-menu',
      name: 'SidebarSettingsMenu',
      description: 'Admin settings submenu',
      filePath: 'src/components/admin/SidebarSettingsMenu.tsx',
      type: 'admin',
      showsOn: ['Admin settings routes'],
      childrenOf: 'admin-navigation',
    },
    
    // Calendar Navigation Sections
    {
      id: 'calendar-navigation',
      name: 'CalendarNavigation',
      description: 'Calendar section navigation',
      filePath: 'src/components/layout/sidebar/navigation/CalendarNavigation.tsx',
      type: 'section',
      showsOn: ['All non-admin routes'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'gamification-navigation',
      name: 'GamificationNavigation',
      description: 'Gamification features navigation',
      filePath: 'src/components/layout/sidebar/navigation/GamificationNavigation.tsx',
      type: 'section',
      showsOn: ['All non-admin routes'],
      childrenOf: 'sidebar-main-navigation',
    },
    {
      id: 'administracion-navigation',
      name: 'AdministracionNavigation',
      description: 'Admin features in user sidebar',
      filePath: 'src/components/layout/sidebar/navigation/AdministracionNavigation.tsx',
      type: 'section',
      showsOn: ['For users with admin, sistemas roles'],
      childrenOf: 'sidebar-main-navigation',
    },
    
    // Configuration Files
    {
      id: 'nav-index',
      name: 'navigation/index.ts',
      description: 'Central export of navigation items',
      filePath: 'src/config/navigation/index.ts',
      type: 'config',
      showsOn: ['Used throughout the app'],
    },
    {
      id: 'admin-nav-config',
      name: 'adminNavigation.ts',
      description: 'Admin navigation configuration',
      filePath: 'src/config/navigation/adminNavigation.ts',
      type: 'config',
      showsOn: ['Admin routes'],
    },
    {
      id: 'main-nav-config',
      name: 'mainNavigation.ts',
      description: 'Main navigation configuration',
      filePath: 'src/config/navigation/mainNavigation.ts',
      type: 'config',
      showsOn: ['Non-admin routes'],
    },
    {
      id: 'explore-nav-config',
      name: 'exploreNavigation.ts',
      description: 'Explore section configuration',
      filePath: 'src/config/navigation/exploreNavigation.ts',
      type: 'config',
      showsOn: ['Explore section in sidebar'],
    },
    {
      id: 'instructor-nav-config',
      name: 'instructorNavigation.ts',
      description: 'Instructor navigation configuration',
      filePath: 'src/config/navigation/instructorNavigation.ts',
      type: 'config',
      showsOn: ['For instructor role'],
    },
    {
      id: 'academic-nav-config',
      name: 'academicNavigation.ts',
      description: 'Academic management navigation',
      filePath: 'src/config/navigation/academicNavigation.ts',
      type: 'config',
      showsOn: ['For admin role'],
    },
    {
      id: 'finance-nav-config',
      name: 'financeNavigation.ts',
      description: 'Finance section navigation',
      filePath: 'src/config/navigation/financeNavigation.ts',
      type: 'config',
      showsOn: ['For admin role'],
    },
    {
      id: 'settings-nav-config',
      name: 'settingsNavigation.ts',
      description: 'Settings navigation configuration',
      filePath: 'src/config/navigation/settingsNavigation.ts',
      type: 'config',
      showsOn: ['Admin settings routes'],
    },
    {
      id: 'gamification-nav-config',
      name: 'gamificationNavigation.ts',
      description: 'Gamification navigation configuration',
      filePath: 'src/config/navigation/gamificationNavigation.ts',
      type: 'config',
      showsOn: ['For student/user roles'],
    },
    {
      id: 'menu-config',
      name: 'menuConfig.ts',
      description: 'Menu configuration wrapper',
      filePath: 'src/config/menuConfig.ts',
      type: 'config',
      showsOn: ['Throughout the app'],
    },
  ];

  const [visibleComponents, setVisibleComponents] = useState<Record<string, boolean>>(
    navComponents.reduce((acc, component) => ({
      ...acc,
      [component.id]: true
    }), {})
  );

  const toggleComponentVisibility = (id: string) => {
    setVisibleComponents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'container': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'section': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'config': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Filter components by type
  const containerComponents = navComponents.filter(c => c.type === 'container' && !c.childrenOf);
  const sectionComponents = navComponents.filter(c => c.type === 'section');
  const adminComponents = navComponents.filter(c => c.type === 'admin');
  const configComponents = navComponents.filter(c => c.type === 'config');
  
  // Create hierarchical tree
  const createHierarchicalTree = () => {
    // Get root components
    const rootComponents = navComponents.filter(c => !c.childrenOf);
    
    // Create a function to get children recursively
    const getChildren = (parentId: string) => {
      return navComponents.filter(c => c.childrenOf === parentId);
    };
    
    // Render a component and its children
    const renderComponent = (component: NavComponent, level: number = 0) => {
      const isVisible = visibleComponents[component.id];
      const children = getChildren(component.id);
      
      return (
        <div key={component.id} className="mb-2">
          <div 
            className={`flex items-center p-2 rounded-md ${level > 0 ? 'ml-' + (level * 6) : ''} ${
              children.length > 0 ? 'cursor-pointer hover:bg-muted/50' : ''
            }`}
            onClick={() => children.length > 0 && toggleComponentVisibility(component.id)}
          >
            {children.length > 0 ? (
              isVisible ? (
                <ChevronDown className="h-4 w-4 mr-2 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
              )
            ) : (
              <div className="w-6" />
            )}
            
            <div className="flex items-center flex-1">
              <span className="font-medium mr-2">{component.name}</span>
              <Badge variant="outline" className={getTypeColor(component.type)}>
                {component.type}
              </Badge>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                toggleComponentVisibility(component.id);
              }}
            >
              {isVisible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isVisible && children.length > 0 && (
            <div className="ml-6 border-l pl-3 border-border">
              {children.map(child => renderComponent(child, level + 1))}
            </div>
          )}
        </div>
      );
    };
    
    return (
      <div className="space-y-2">
        {rootComponents.map(component => renderComponent(component))}
      </div>
    );
  };

  return (
    <div className="container py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Navegación del Sistema</h1>
          <p className="text-muted-foreground mb-6">
            Esta página muestra todos los componentes de navegación en la aplicación para ayudar a decidir qué mantener y qué eliminar.
          </p>
          <div className="flex justify-end mb-4">
            <Link to="/admin/settings/features">
              <Button variant="outline">Volver a configuración</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="hierarchical">
          <TabsList className="mb-4">
            <TabsTrigger value="hierarchical">Vista Jerárquica</TabsTrigger>
            <TabsTrigger value="categorized">Por Categoría</TabsTrigger>
            <TabsTrigger value="admin-preview">Previsualización Admin</TabsTrigger>
            <TabsTrigger value="raw-data">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="hierarchical">
            <Card>
              <CardHeader>
                <CardTitle>Estructura Jerárquica de Navegación</CardTitle>
                <CardDescription>
                  Esta vista muestra cómo los componentes de navegación se relacionan entre sí.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {createHierarchicalTree()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categorized">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contenedores Principales</CardTitle>
                  <CardDescription>
                    Componentes que contienen otras partes de la navegación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {containerComponents.map(component => (
                      <li key={component.id} className="border-b pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-semibold">{component.name}</span>
                            <Badge className="ml-2" variant="outline">{component.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => toggleComponentVisibility(component.id)}
                          >
                            {visibleComponents[component.id] ? 'Ocultar' : 'Mostrar'}
                          </Button>
                        </div>
                        {visibleComponents[component.id] && (
                          <>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Ruta:</span> {component.filePath}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Mostrado en:</span> {component.showsOn.join(', ')}
                            </p>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Secciones de Navegación</CardTitle>
                  <CardDescription>
                    Componentes de secciones específicas dentro de la navegación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {sectionComponents.map(component => (
                      <li key={component.id} className="border-b pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-semibold">{component.name}</span>
                            <Badge className="ml-2" variant="outline">{component.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => toggleComponentVisibility(component.id)}
                          >
                            {visibleComponents[component.id] ? 'Ocultar' : 'Mostrar'}
                          </Button>
                        </div>
                        {visibleComponents[component.id] && (
                          <>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Ruta:</span> {component.filePath}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Mostrado en:</span> {component.showsOn.join(', ')}
                            </p>
                            {component.childrenOf && (
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Hijo de:</span> {
                                  navComponents.find(c => c.id === component.childrenOf)?.name || component.childrenOf
                                }
                              </p>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Componentes de Administración</CardTitle>
                  <CardDescription>
                    Navegación específica para el panel de administración
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {adminComponents.map(component => (
                      <li key={component.id} className="border-b pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-semibold">{component.name}</span>
                            <Badge className="ml-2" variant="outline">{component.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => toggleComponentVisibility(component.id)}
                          >
                            {visibleComponents[component.id] ? 'Ocultar' : 'Mostrar'}
                          </Button>
                        </div>
                        {visibleComponents[component.id] && (
                          <>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Ruta:</span> {component.filePath}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Mostrado en:</span> {component.showsOn.join(', ')}
                            </p>
                            {component.childrenOf && (
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Hijo de:</span> {
                                  navComponents.find(c => c.id === component.childrenOf)?.name || component.childrenOf
                                }
                              </p>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Archivos de Configuración</CardTitle>
                  <CardDescription>
                    Archivos que definen y exportan la configuración de navegación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {configComponents.map(component => (
                      <li key={component.id} className="border-b pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-semibold">{component.name}</span>
                            <Badge className="ml-2" variant="outline">{component.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => toggleComponentVisibility(component.id)}
                          >
                            {visibleComponents[component.id] ? 'Ocultar' : 'Mostrar'}
                          </Button>
                        </div>
                        {visibleComponents[component.id] && (
                          <>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Ruta:</span> {component.filePath}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Usado en:</span> {component.showsOn.join(', ')}
                            </p>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin-preview">
            <Card>
              <CardHeader>
                <CardTitle>Previsualización de Navegación Admin</CardTitle>
                <CardDescription>
                  Vista de la estructura actual del menú de administración
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 max-w-[280px] bg-card">
                  <h3 className="text-lg font-semibold mb-4">AdminNavigation Preview</h3>
                  <AdminNavigation />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Este es el componente real <code>AdminNavigation</code> renderizado desde su implementación actual.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="raw-data">
            <Card>
              <CardHeader>
                <CardTitle>Datos de Navegación</CardTitle>
                <CardDescription>
                  Datos crudos de la configuración de navegación del rol actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="main">
                  <TabsList className="mb-4">
                    <TabsTrigger value="main">Principal</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="explore">Explorar</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                      {JSON.stringify(getNavigationByRole('student').main, null, 2)}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="admin">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                      {JSON.stringify(getNavigationByRole('admin').admin, null, 2)}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="explore">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                      {JSON.stringify(getNavigationByRole('student').explore, null, 2)}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="instructor">
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                      {JSON.stringify(getNavigationByRole('instructor').instructor, null, 2)}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Próximos Pasos</h2>
          <p className="mb-4">
            Revise los componentes y archivos de navegación mostrados arriba y decida cuáles mantener y cuáles eliminar.
            Use esta información para:
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Identificar componentes de navegación duplicados</li>
            <li>Determinar qué elementos pueden ser consolidados</li>
            <li>Encontrar navegación obsoleta o no utilizada</li>
            <li>Planificar una estructura de navegación más limpia</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NavigationDiagram;
