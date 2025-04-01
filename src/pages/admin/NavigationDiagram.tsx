
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  ScanSearch, 
  Navigation, 
  Navigation2,
  Menu,
  FileText,
  LayoutDashboard,
  User,
  BookOpen,
  Compass,
  AlertTriangle,
  LayoutGrid
} from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { 
  mainNavigation,
  exploreNavigation,
  instructorNavigation,
  academicNavigation,
  financeNavigation,
  settingsNavigation,
  gamificationNavigation
} from '@/config/navigation';

const NavigationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState('menus');
  
  // Función para renderizar iconos de React
  const renderIcon = (icon: any) => {
    if (!icon) return null;
    
    // Si el icono es un componente de Lucide o una función
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent className="h-4 w-4 text-primary mr-2" />;
    }
    
    // Para otros tipos de iconos (si es un ReactNode)
    return <span className="mr-2">{React.isValidElement(icon) ? icon : null}</span>;
  };

  // Función para mostrar el estado de los elementos
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Activo</Badge>;
      case 'development':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">En desarrollo</Badge>;
      case 'deprecated':
        return <Badge variant="destructive">Obsoleto</Badge>;
      default:
        return null;
    }
  };

  // Agrupar menús para mostrarlos organizados
  const menuGroups = [
    { key: 'main', title: 'Menú Principal', description: 'Navegación principal para todos los usuarios', items: mainNavigation },
    { key: 'explore', title: 'Menú de Exploración', description: 'Para descubrir cursos y contenido', items: exploreNavigation },
    { key: 'instructor', title: 'Menú de Instructor', description: 'Para profesores', items: instructorNavigation },
    { key: 'academic', title: 'Menú Académico', description: 'Para gestión académica', items: academicNavigation },
    { key: 'finance', title: 'Menú de Finanzas', description: 'Para gestión económica', items: financeNavigation },
    { key: 'settings', title: 'Menú de Configuración', description: 'Para ajustes del sistema', items: settingsNavigation },
    { key: 'gamification', title: 'Menú de Gamificación', description: 'Para elementos de gamificación', items: gamificationNavigation }
  ];

  // Componentes de interfaz
  const sidebarComponents = [
    { name: 'SidebarContent', path: 'src/components/layout/sidebar/SidebarContent.tsx', description: 'Contenido principal de la barra lateral', status: 'active' },
    { name: 'SidebarLogoSection', path: 'src/components/layout/sidebar/SidebarLogoSection.tsx', description: 'Sección del logo en la barra lateral', status: 'active' },
    { name: 'SidebarFooterSection', path: 'src/components/layout/sidebar/SidebarFooterSection.tsx', description: 'Sección inferior de la barra lateral', status: 'active' },
    { name: 'SidebarNavGroup', path: 'src/components/layout/sidebar/navigation/SidebarNavGroup.tsx', description: 'Grupos de navegación en la barra lateral', status: 'active' },
    { name: 'SidebarMainNavigation', path: 'src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx', description: 'Navegación principal de la barra lateral', status: 'active' },
    { name: 'AdminSection', path: 'src/components/layout/sidebar/AdminSection.tsx', description: 'Sección de administración (eliminada)', status: 'deprecated' }
  ];

  // Archivos del sistema de navegación
  const navigationFiles = [
    { name: 'mainNavigation.ts', path: 'src/config/navigation/mainNavigation.ts', description: 'Define ítems del menú principal', status: 'active' },
    { name: 'exploreNavigation.ts', path: 'src/config/navigation/exploreNavigation.ts', description: 'Define ítems del menú de exploración', status: 'active' },
    { name: 'instructorNavigation.ts', path: 'src/config/navigation/instructorNavigation.ts', description: 'Define ítems del menú de instructor', status: 'active' },
    { name: 'academicNavigation.ts', path: 'src/config/navigation/academicNavigation.ts', description: 'Define ítems del menú académico', status: 'active' },
    { name: 'financeNavigation.ts', path: 'src/config/navigation/financeNavigation.ts', description: 'Define ítems del menú de finanzas', status: 'active' },
    { name: 'settingsNavigation.ts', path: 'src/config/navigation/settingsNavigation.ts', description: 'Define ítems del menú de configuración', status: 'active' },
    { name: 'gamificationNavigation.ts', path: 'src/config/navigation/gamificationNavigation.ts', description: 'Define ítems del menú de gamificación', status: 'active' },
    { name: 'adminNavigation.ts', path: 'src/config/navigation/adminNavigation.ts', description: 'Define ítems del menú de administración (eliminado)', status: 'deprecated' },
    { name: 'index.ts', path: 'src/config/navigation/index.ts', description: 'Exporta todos los menús disponibles', status: 'active' },
    { name: 'utils.ts', path: 'src/config/navigation/utils.ts', description: 'Utilidades para filtrar elementos por rol', status: 'active' },
    { name: 'types.ts', path: 'src/config/navigation/types.ts', description: 'Define tipos para elementos de navegación', status: 'active' }
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Diagrama de Navegación</h1>
          <p className="text-muted-foreground">
            Visualiza y gestiona todos los elementos de navegación del sistema
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <LayoutGrid className="h-3.5 w-3.5 mr-1" />
            Componentes: {sidebarComponents.length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Menu className="h-3.5 w-3.5 mr-1" />
            Menús: {menuGroups.length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Archivos: {navigationFiles.length}
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="menus" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menus">
            <Menu className="h-4 w-4 mr-2" />
            Menús
          </TabsTrigger>
          <TabsTrigger value="components">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Componentes
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileText className="h-4 w-4 mr-2" />
            Archivos
          </TabsTrigger>
        </TabsList>
        
        {/* Contenido de la pestaña de Menús */}
        <TabsContent value="menus" className="space-y-6">
          {menuGroups.map((group) => (
            <Card key={group.key} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {group.key === 'main' ? <LayoutDashboard className="h-5 w-5 text-primary" /> :
                   group.key === 'explore' ? <Compass className="h-5 w-5 text-primary" /> :
                   group.key === 'instructor' ? <User className="h-5 w-5 text-primary" /> :
                   <BookOpen className="h-5 w-5 text-primary" />}
                  {group.title}
                </CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Icono</TableHead>
                        <TableHead>Etiqueta</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Roles Permitidos</TableHead>
                        <TableHead>Propiedades</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.items.map((item, index) => (
                        <TableRow key={`${group.key}-${index}`}>
                          <TableCell>
                            {renderIcon(item.icon)}
                          </TableCell>
                          <TableCell>{item.label}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {item.path || item.url || '—'}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.requiredRole && (
                                Array.isArray(item.requiredRole) 
                                  ? item.requiredRole.map((role: UserRoleType) => (
                                      <Badge key={role} variant="outline" className="text-xs">
                                        {role}
                                      </Badge>
                                    ))
                                  : <Badge variant="outline" className="text-xs">{item.requiredRole as string}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.isHighlighted && (
                                <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                                  Destacado
                                </Badge>
                              )}
                              {item.disabled && (
                                <Badge variant="secondary" className="text-xs">
                                  Deshabilitado
                                </Badge>
                              )}
                              {item.external && (
                                <Badge variant="outline" className="text-xs">
                                  Externo
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Contenido de la pestaña de Componentes */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                Componentes de Navegación
              </CardTitle>
              <CardDescription>
                Componentes React utilizados para implementar la navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Ruta del Archivo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sidebarComponents.map((component) => (
                      <TableRow key={component.name}>
                        <TableCell className="font-medium">{component.name}</TableCell>
                        <TableCell className="font-mono text-xs">{component.path}</TableCell>
                        <TableCell>{component.description}</TableCell>
                        <TableCell>{getStatusBadge(component.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contenido de la pestaña de Archivos */}
        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Archivos de Configuración
              </CardTitle>
              <CardDescription>
                Archivos que definen la estructura de navegación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Ruta del Archivo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {navigationFiles.map((file) => (
                      <TableRow key={file.name}>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell className="font-mono text-xs">{file.path}</TableCell>
                        <TableCell>{file.description}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {activeTab === 'menus' && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Menú de Administración Eliminado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 bg-muted rounded-md">
              <div className="flex flex-col items-center gap-2 text-center">
                <Navigation2 className="h-10 w-10 text-primary" />
                <p className="text-muted-foreground">
                  El menú de administración ha sido eliminado del sistema
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Si necesitas restaurar la funcionalidad, por favor contacta al equipo de desarrollo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NavigationDiagram;
