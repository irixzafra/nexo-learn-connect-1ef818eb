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
  LayoutGrid,
  ArrowRight
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
  const [activeTab, setActiveTab] = useState('diagram');
  const [selectedMenu, setSelectedMenu] = useState<string | null>('main');

  const renderIcon = (icon: any) => {
    if (!icon) return null;
    
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent className="h-4 w-4 text-primary mr-2" />;
    }
    
    return <span className="mr-2">{React.isValidElement(icon) ? icon : null}</span>;
  };

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

  const menuGroups = [
    { key: 'main', title: 'Menú Principal', description: 'Navegación principal para todos los usuarios', items: mainNavigation },
    { key: 'explore', title: 'Menú de Exploración', description: 'Para descubrir cursos y contenido', items: exploreNavigation },
    { key: 'instructor', title: 'Menú de Instructor', description: 'Para profesores', items: instructorNavigation },
    { key: 'academic', title: 'Menú Académico', description: 'Para gestión académica', items: academicNavigation },
    { key: 'finance', title: 'Menú de Finanzas', description: 'Para gestión económica', items: financeNavigation },
    { key: 'settings', title: 'Menú de Configuración', description: 'Para ajustes del sistema', items: settingsNavigation },
    { key: 'gamification', title: 'Menú de Gamificación', description: 'Para elementos de gamificación', items: gamificationNavigation }
  ];

  const sidebarComponents = [
    { name: 'SidebarContent', path: 'src/components/layout/sidebar/SidebarContent.tsx', description: 'Contenido principal de la barra lateral', status: 'active' },
    { name: 'SidebarLogoSection', path: 'src/components/layout/sidebar/SidebarLogoSection.tsx', description: 'Sección del logo en la barra lateral', status: 'active' },
    { name: 'SidebarFooterSection', path: 'src/components/layout/sidebar/SidebarFooterSection.tsx', description: 'Sección inferior de la barra lateral', status: 'active' },
    { name: 'SidebarNavGroup', path: 'src/components/layout/sidebar/navigation/SidebarNavGroup.tsx', description: 'Grupos de navegación en la barra lateral', status: 'active' },
    { name: 'SidebarMainNavigation', path: 'src/components/layout/sidebar/navigation/SidebarMainNavigation.tsx', description: 'Navegación principal de la barra lateral', status: 'active' },
    { name: 'AdminSection', path: 'src/components/layout/sidebar/AdminSection.tsx', description: 'Sección de administración (eliminada)', status: 'deprecated' }
  ];

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

  const getMenuBorderColor = (key: string) => {
    switch (key) {
      case 'main': return 'border-blue-500';
      case 'explore': return 'border-green-500';
      case 'instructor': return 'border-purple-500';
      case 'academic': return 'border-amber-500';
      case 'finance': return 'border-emerald-500';
      case 'settings': return 'border-gray-500';
      case 'gamification': return 'border-pink-500';
      default: return 'border-gray-300';
    }
  };

  const getMenuIcon = (key: string) => {
    switch (key) {
      case 'main': return <LayoutDashboard className="h-6 w-6 text-blue-500" />;
      case 'explore': return <Compass className="h-6 w-6 text-green-500" />;
      case 'instructor': return <User className="h-6 w-6 text-purple-500" />;
      case 'academic': return <BookOpen className="h-6 w-6 text-amber-500" />;
      case 'finance': return <LayoutDashboard className="h-6 w-6 text-emerald-500" />;
      case 'settings': return <Menu className="h-6 w-6 text-gray-500" />;
      case 'gamification': return <Navigation2 className="h-6 w-6 text-pink-500" />;
      default: return <Menu className="h-6 w-6 text-gray-400" />;
    }
  };

  const getMenuTextColor = (key: string) => {
    switch (key) {
      case 'main': return 'text-blue-700';
      case 'explore': return 'text-green-700';
      case 'instructor': return 'text-purple-700';
      case 'academic': return 'text-amber-700';
      case 'finance': return 'text-emerald-700';
      case 'settings': return 'text-gray-700';
      case 'gamification': return 'text-pink-700';
      default: return 'text-gray-700';
    }
  };

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
      
      <Tabs defaultValue="diagram" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menus">
            <Menu className="h-4 w-4 mr-2" />
            Menús
          </TabsTrigger>
          <TabsTrigger value="diagram">
            <Navigation className="h-4 w-4 mr-2" />
            Diagrama Visual
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
        
        <TabsContent value="diagram" className="space-y-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Estructura de Navegación
              </CardTitle>
              <CardDescription>
                Visualización gráfica de la estructura de menús del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-3">Selecciona un menú para ver su estructura</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuGroups.map((group) => (
                    <button
                      key={group.key}
                      onClick={() => setSelectedMenu(group.key)}
                      className={`p-4 rounded-lg border-2 hover:bg-muted/50 transition-all ${getMenuBorderColor(group.key)} ${selectedMenu === group.key ? 'bg-muted/80 shadow-md' : ''}`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        {getMenuIcon(group.key)}
                        <span className={`font-medium ${getMenuTextColor(group.key)}`}>{group.title}</span>
                        <span className="text-xs text-muted-foreground">{group.items.length} elementos</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedMenu && (
                <div className="mt-8 border rounded-lg p-6 bg-muted/20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {getMenuIcon(selectedMenu)}
                    <span>
                      {menuGroups.find(g => g.key === selectedMenu)?.title}
                    </span>
                  </h3>
                  
                  <div className="overflow-auto">
                    <div className="flex justify-center w-full min-w-[600px]">
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-lg ${getMenuBorderColor(selectedMenu)} border-2 bg-white dark:bg-card mb-8 shadow-md`}>
                          <div className="font-medium">
                            {menuGroups.find(g => g.key === selectedMenu)?.title}
                          </div>
                        </div>
                        
                        <div className="w-px h-8 bg-gray-300"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                          {menuGroups.find(g => g.key === selectedMenu)?.items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className="w-px h-8 bg-gray-300"></div>
                              
                              <div className="w-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-card shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  {renderIcon(item.icon)}
                                  <span className="font-medium truncate">{item.label}</span>
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {item.path || item.url || '—'}
                                </div>
                                {item.disabled && (
                                  <Badge variant="secondary" className="mt-2 text-xs">Deshabilitado</Badge>
                                )}
                              </div>
                              
                              <div className="mt-2 flex flex-wrap justify-center gap-1">
                                {item.requiredRole && (
                                  Array.isArray(item.requiredRole) 
                                    ? (item.requiredRole.length > 3 
                                        ? <Badge variant="outline" className="text-xs">
                                            {item.requiredRole.length} roles
                                          </Badge>
                                        : item.requiredRole.map((role: UserRoleType) => (
                                            <Badge key={role} variant="outline" className="text-xs">
                                              {role}
                                            </Badge>
                                          ))
                                      )
                                    : <Badge variant="outline" className="text-xs">{item.requiredRole as string}</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!selectedMenu && (
                <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                  <Navigation2 className="h-12 w-12 mb-4 text-muted-foreground/50" />
                  <p>Selecciona un menú para visualizar su estructura</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                Vista General del Sistema
              </CardTitle>
              <CardDescription>
                Relación entre los diferentes menús
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto py-6">
                <div className="flex justify-center min-w-[800px]">
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="p-4 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center" style={{width: '100px', height: '100px'}}>
                        <div className="text-center">
                          <LayoutDashboard className="h-6 w-6 mx-auto mb-1" />
                          <div className="text-xs font-medium">Menú Principal</div>
                        </div>
                      </div>
                    </div>
                    
                    {menuGroups.filter(g => g.key !== 'main').map((group, index) => {
                      const angle = (index * (360 / (menuGroups.length - 1))) * (Math.PI / 180);
                      const x = Math.cos(angle) * 200;
                      const y = Math.sin(angle) * 150;
                      
                      return (
                        <React.Fragment key={group.key}>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            <svg width="100%" height="100%" viewBox="-250 -180 500 360" style={{overflow: 'visible'}}>
                              <line 
                                x1="0" 
                                y1="0" 
                                x2={x} 
                                y2={y} 
                                stroke="#e2e8f0" 
                                strokeWidth="2"
                                strokeDasharray="5,5" 
                              />
                              <ArrowRight 
                                className="text-gray-400" 
                                size={16} 
                                style={{
                                  transform: `translate(${x - (x > 0 ? 8 : -8)}px, ${y - 8}px)`,
                                }}
                              />
                            </svg>
                          </div>
                          
                          <div 
                            className={`absolute p-3 rounded-full shadow-md flex items-center justify-center ${getMenuBorderColor(group.key)} border bg-white dark:bg-card z-10`}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              transform: 'translate(-50%, -50%)',
                              width: '80px',
                              height: '80px',
                            }}
                          >
                            <div className="text-center">
                              {getMenuIcon(group.key)}
                              <div className="text-xs font-medium">{group.title.split(' ').pop()}</div>
                              <div className="text-xs text-muted-foreground">{group.items.length}</div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Leyenda</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuGroups.map((group) => (
                    <div key={group.key} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getMenuBorderColor(group.key)} bg-white border-2`}></div>
                      <span className="text-sm">{group.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
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
