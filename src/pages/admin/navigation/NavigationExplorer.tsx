
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Map, 
  FileText,
  Filter 
} from 'lucide-react';
import { 
  mainNavigation, 
  adminNavigation, 
  exploreNavigation, 
  instructorNavigation, 
  academicNavigation, 
  financeNavigation, 
  settingsNavigation 
} from '@/config/navigation';
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/config/navigation/types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const roleColors: Record<UserRoleType, string> = {
  admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  guest: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  student: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  instructor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  moderator: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  content_creator: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  sistemas: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  beta_tester: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
};

const navigationGroups = [
  { label: 'Principal', value: 'main', data: mainNavigation },
  { label: 'Administración', value: 'admin', data: adminNavigation },
  { label: 'Explorar', value: 'explore', data: exploreNavigation },
  { label: 'Instructor', value: 'instructor', data: instructorNavigation },
  { label: 'Académico', value: 'academic', data: academicNavigation },
  { label: 'Finanzas', value: 'finance', data: financeNavigation },
  { label: 'Configuración', value: 'settings', data: settingsNavigation }
];

const NavigationExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRoleType[]>([]);
  
  const handleRoleToggle = (role: UserRoleType) => {
    setRoleFilter(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };
  
  const renderRoleBadges = (roles: UserRoleType | UserRoleType[]) => {
    const roleList = Array.isArray(roles) ? roles : [roles];
    
    return (
      <div className="flex flex-wrap gap-1">
        {roleList.map(role => (
          <Badge key={role} className={roleColors[role] || ''} variant="outline">
            {role}
          </Badge>
        ))}
      </div>
    );
  };
  
  const filterByQuery = (items: MenuItem[]) => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.label.toLowerCase().includes(query) || 
      item.path.toLowerCase().includes(query) || 
      item.description?.toLowerCase().includes(query)
    );
  };
  
  const filterByRoles = (items: MenuItem[]) => {
    if (roleFilter.length === 0) return items;
    
    return items.filter(item => {
      const itemRoles = Array.isArray(item.requiredRole) 
        ? item.requiredRole 
        : [item.requiredRole];
        
      return itemRoles.some(role => roleFilter.includes(role));
    });
  };
  
  const getFilteredItems = (items: MenuItem[]) => {
    return filterByRoles(filterByQuery(items));
  };
  
  return (
    <AdminPageLayout
      title="Explorador de Navegación"
      subtitle="Visualiza y explora todos los elementos de navegación del sistema"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Mapa de Navegación</CardTitle>
            <CardDescription>
              Explore la estructura completa de navegación de la plataforma, incluyendo rutas, permisos y descripciones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar elementos de navegación..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar por rol</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.keys(roleColors).map((role) => (
                    <DropdownMenuCheckboxItem
                      key={role}
                      checked={roleFilter.includes(role as UserRoleType)}
                      onCheckedChange={() => handleRoleToggle(role as UserRoleType)}
                    >
                      <Badge className={roleColors[role as UserRoleType]} variant="outline">
                        {role}
                      </Badge>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Tabs defaultValue="main">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 w-full">
                {navigationGroups.map(group => (
                  <TabsTrigger key={group.value} value={group.value} className="text-xs sm:text-sm">
                    {group.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {navigationGroups.map(group => (
                <TabsContent key={group.value} value={group.value} className="mt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Elemento</TableHead>
                          <TableHead className="min-w-[200px]">Ruta</TableHead>
                          <TableHead className="min-w-[150px]">Roles</TableHead>
                          <TableHead className="min-w-[300px]">Descripción</TableHead>
                          <TableHead className="w-[100px]">Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredItems(group.data).map((item, index) => (
                          <TableRow key={`${group.value}-${index}`}>
                            <TableCell className="font-medium flex items-center gap-2">
                              <div className="p-1.5 bg-muted rounded-md">
                                <item.icon className="h-4 w-4 text-primary" />
                              </div>
                              {item.label}
                              {item.isHighlighted && (
                                <Badge variant="default" className="ml-2">Destacado</Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {item.path}
                            </TableCell>
                            <TableCell>
                              {renderRoleBadges(item.requiredRole)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {item.description || "Sin descripción"}
                            </TableCell>
                            <TableCell>
                              {item.disabled ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800">Desactivado</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-green-100 text-green-800">Activo</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {getFilteredItems(group.data).length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <FileText className="h-8 w-8 mb-2" />
                                <p>No se encontraron elementos que coincidan con los filtros</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mapa Visual</CardTitle>
            <CardDescription>
              Diagrama de la estructura de navegación del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center text-center p-10 border border-dashed rounded-lg w-full">
              <Map className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Mapa Visual de Navegación</h3>
              <p className="text-muted-foreground max-w-md">
                Un diagrama visual de la estructura de navegación estará disponible próximamente. Mostrará las relaciones entre las diferentes secciones del sistema.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default NavigationExplorer;
