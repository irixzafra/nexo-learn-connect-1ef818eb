
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Route, List, LayoutDashboard, Cog, Users, BookOpen, FileText 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import appRoutes from '@/routes/app';
import { adminNavigation } from '@/config/navigation/adminNavigation';
import { settingsNavigation } from '@/config/navigation/settingsNavigation';

const extractRoutes = (routes, parentPath = '') => {
  if (!routes) return [];
  
  let extractedRoutes = [];
  
  routes.forEach(route => {
    if (route.path) {
      const fullPath = parentPath ? 
        `${parentPath}/${route.path}`.replace(/\/+/g, '/') : 
        route.path;
      
      extractedRoutes.push({
        path: fullPath,
        element: route.element ? true : false,
        index: route.index || false,
      });
    }
    
    if (route.children) {
      const newParentPath = route.path ? 
        `${parentPath}/${route.path}`.replace(/\/+/g, '/') : 
        parentPath;
      
      extractedRoutes = [
        ...extractedRoutes,
        ...extractRoutes(route.children, newParentPath)
      ];
    }
  });
  
  return extractedRoutes;
};

const groupRoutesBySection = (routes) => {
  const sections = {
    app: [],
    admin: [],
    auth: [],
    instructor: [],
    student: [],
    profile: [],
    settings: [],
    other: [],
  };
  
  routes.forEach(route => {
    const path = route.path;
    
    if (path.includes('/app/admin')) {
      sections.admin.push(route);
    } else if (path.includes('/app/instructor')) {
      sections.instructor.push(route);
    } else if (path.includes('/app/student')) {
      sections.student.push(route);
    } else if (path.includes('/app/profile')) {
      sections.profile.push(route);
    } else if (path.includes('/app/settings')) {
      sections.settings.push(route);
    } else if (path.includes('/auth') || path.includes('login') || path.includes('register')) {
      sections.auth.push(route);
    } else if (path.startsWith('/app')) {
      sections.app.push(route);
    } else {
      sections.other.push(route);
    }
  });
  
  return sections;
};

const RouteItem = ({ route, level = 0 }) => {
  const indentation = level * 16;
  
  return (
    <div 
      className="py-2 px-3 border-b border-border last:border-0 hover:bg-accent/5"
      style={{ paddingLeft: `${indentation + 12}px` }}
    >
      <div className="flex items-center gap-2">
        <Route className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm">{route.path}</span>
        {route.index && (
          <Badge variant="outline" className="text-xs">index</Badge>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ item, level = 0 }) => {
  const indentation = level * 16;
  const Icon = item.icon || List;
  
  return (
    <div>
      <div 
        className="py-2 px-3 border-b border-border hover:bg-accent/5"
        style={{ paddingLeft: `${indentation + 12}px` }}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span>{item.label}</span>
          {item.requiredRole && (
            <Badge variant="outline" className="text-xs">
              {Array.isArray(item.requiredRole) 
                ? item.requiredRole.join(', ') 
                : item.requiredRole}
            </Badge>
          )}
        </div>
      </div>
      
      {item.submenu && (
        <div>
          {item.submenu.map((subItem, index) => (
            <MenuItem 
              key={`${subItem.label}-${index}`} 
              item={subItem} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavigationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [routeGroups, setRouteGroups] = useState<Record<string, any>>({
    admin: [],
    instructor: [],
    student: [],
    settings: [],
    app: [],
    auth: [],
    profile: [],
    other: []
  });
  
  useEffect(() => {
    const extractedRoutes = extractRoutes(appRoutes);
    const grouped = groupRoutesBySection(extractedRoutes);
    setRouteGroups(grouped);
  }, []);
  
  // Fixed: Safely get menu items from the navigation objects
  const getMenuItems = (navigation: any) => {
    if (Array.isArray(navigation)) {
      return navigation;
    } else if (navigation && typeof navigation === 'object' && 'main' in navigation) {
      return navigation.main || [];
    }
    return [];
  };
  
  const adminMenuItems = getMenuItems(adminNavigation);
  const settingsMenuItems = getMenuItems(settingsNavigation);
  
  return (
    <AdminPageLayout
      title="Diagrama de Navegación"
      subtitle="Visualiza la estructura de rutas y navegación de la aplicación"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <Route className="h-4 w-4" />
            <span>Rutas</span>
          </TabsTrigger>
          <TabsTrigger value="menus" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Menús</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <LayoutDashboard className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Rutas de Administrador</CardTitle>
                </div>
                <CardDescription>
                  Rutas disponibles en el área de administración
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {routeGroups.admin && routeGroups.admin.length > 0 ? (
                    routeGroups.admin.map((route, index) => (
                      <RouteItem key={`admin-${index}`} route={route} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay rutas disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Rutas de Instructor</CardTitle>
                </div>
                <CardDescription>
                  Rutas disponibles para los instructores
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {routeGroups.instructor && routeGroups.instructor.length > 0 ? (
                    routeGroups.instructor.map((route, index) => (
                      <RouteItem key={`instructor-${index}`} route={route} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay rutas disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Rutas de Estudiante</CardTitle>
                </div>
                <CardDescription>
                  Rutas disponibles para los estudiantes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {routeGroups.student && routeGroups.student.length > 0 ? (
                    routeGroups.student.map((route, index) => (
                      <RouteItem key={`student-${index}`} route={route} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay rutas disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Cog className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Rutas de Configuración</CardTitle>
                </div>
                <CardDescription>
                  Rutas relacionadas con la configuración del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {routeGroups.settings && routeGroups.settings.length > 0 ? (
                    routeGroups.settings.map((route, index) => (
                      <RouteItem key={`settings-${index}`} route={route} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay rutas disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="menus" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <LayoutDashboard className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Menú de Administración</CardTitle>
                </div>
                <CardDescription>
                  Estructura del menú de administración
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {adminMenuItems && adminMenuItems.length > 0 ? (
                    adminMenuItems.map((item, index) => (
                      <MenuItem key={`admin-menu-${index}`} item={item} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay elementos de menú disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Cog className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Menú de Configuración</CardTitle>
                </div>
                <CardDescription>
                  Estructura del menú de configuración
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-md max-h-[400px] overflow-y-auto">
                  {settingsMenuItems && settingsMenuItems.length > 0 ? (
                    settingsMenuItems.map((item, index) => (
                      <MenuItem key={`settings-menu-${index}`} item={item} />
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No hay elementos de menú disponibles
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  <CardTitle>Documentación de Rutas</CardTitle>
                </div>
                <CardDescription>
                  Enlaces a la documentación de rutas y navegación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Para más información sobre la estructura de rutas y navegación, consulta la documentación completa.
                  </p>
                  
                  <div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/docs" target="_blank" rel="noopener noreferrer">
                        Ver Documentación
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default NavigationDiagram;
