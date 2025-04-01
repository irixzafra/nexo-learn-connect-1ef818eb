import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
  Compass, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  List, 
  LayoutGrid 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRoleType } from '@/types/auth';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Link } from 'react-router-dom';

// Define a dictionary to map user roles to readable names
const roleNames: Record<UserRoleType, string> = {
  admin: 'Administrador',
  guest: 'Invitado',
  student: 'Estudiante',
  instructor: 'Instructor',
  moderator: 'Moderador',
  content_creator: 'Creador de Contenido',
  sistemas: 'Sistemas',
  beta_tester: 'Beta Tester',
  anonimo: 'Anónimo'
};

// Define statuses for routes
type RouteStatus = 'active' | 'development' | 'not-implemented' | 'duplicate' | 'deprecated';

// Route interface
interface Route {
  path: string;
  component: string;
  status: RouteStatus;
  importance: 'high' | 'medium' | 'low';
  roles: UserRoleType[];
  category: string;
  notes?: string;
}

// Convert status to badge variant
const getStatusBadge = (status: RouteStatus) => {
  switch (status) {
    case 'active':
      return { variant: 'success' as const, icon: <CheckCircle className="h-3 w-3 mr-1" /> };
    case 'development':
      return { variant: 'default' as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
    case 'not-implemented':
      return { variant: 'destructive' as const, icon: <XCircle className="h-3 w-3 mr-1" /> };
    case 'duplicate':
      return { variant: 'secondary' as const, icon: <List className="h-3 w-3 mr-1" /> };
    case 'deprecated':
      return { variant: 'outline' as const, icon: <XCircle className="h-3 w-3 mr-1" /> };
  }
};

// Dummy data for routes based on the documentation
const routes: Route[] = [
  // Public routes
  { path: '/', component: 'Index', status: 'active', importance: 'high', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Public' },
  { path: '/landing', component: 'LandingPage', status: 'active', importance: 'high', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Public' },
  { path: '/auth/login', component: 'Login', status: 'active', importance: 'high', roles: ['guest'], category: 'Authentication' },
  { path: '/auth/register', component: 'Register', status: 'active', importance: 'high', roles: ['guest'], category: 'Authentication' },
  { path: '/about-us', component: 'AboutUs', status: 'active', importance: 'medium', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Public' },
  { path: '/scholarships', component: 'Scholarships', status: 'active', importance: 'medium', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Public' },
  { path: '/contact', component: 'ContactPage', status: 'development', importance: 'medium', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Public' },
  { path: '/unauthorized', component: 'Unauthorized', status: 'active', importance: 'medium', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Error' },
  { path: '/courses', component: 'CoursesCatalog', status: 'duplicate', importance: 'high', roles: ['guest', 'student', 'instructor', 'admin'], category: 'Courses' },
  
  // Student routes
  { path: '/home', component: 'Dashboard', status: 'active', importance: 'high', roles: ['student', 'instructor', 'admin'], category: 'Dashboard' },
  { path: '/dashboard', component: 'Dashboard', status: 'duplicate', importance: 'high', roles: ['student', 'instructor', 'admin'], category: 'Dashboard' },
  { path: '/profile', component: 'Profile', status: 'active', importance: 'high', roles: ['student', 'instructor', 'admin'], category: 'User' },
  { path: '/profile/settings', component: 'ProfileSettings', status: 'development', importance: 'medium', roles: ['student', 'instructor', 'admin'], category: 'User' },
  { path: '/my-courses', component: 'StudentCourses', status: 'active', importance: 'high', roles: ['student', 'instructor', 'admin'], category: 'Courses' },
  { path: '/courses/:courseId/learn', component: 'CourseLearn', status: 'active', importance: 'high', roles: ['student', 'instructor', 'admin'], category: 'Courses' },
  
  // Admin routes
  { path: '/admin/dashboard', component: 'AdminDashboard', status: 'active', importance: 'high', roles: ['admin', 'sistemas'], category: 'Admin' },
  { path: '/admin/users', component: 'UserManagement', status: 'development', importance: 'high', roles: ['admin', 'sistemas'], category: 'Admin' },
  { path: '/admin/roles', component: 'RoleManagement', status: 'development', importance: 'high', roles: ['admin', 'sistemas'], category: 'Admin' },
  { path: '/admin/courses', component: 'AdminCourses', status: 'duplicate', importance: 'high', roles: ['admin', 'sistemas'], category: 'Admin' },
  { path: '/admin/categories', component: 'CategoryManagement', status: 'development', importance: 'medium', roles: ['admin', 'sistemas'], category: 'Admin' },
  { path: '/admin/analytics', component: 'AnalyticsOverview', status: 'active', importance: 'medium', roles: ['admin', 'sistemas'], category: 'Analytics' },
  { path: '/admin/features', component: 'FeatureManagement', status: 'development', importance: 'medium', roles: ['admin', 'sistemas'], category: 'System' },
  
  // Instructor routes
  { path: '/instructor/dashboard', component: 'InstructorDashboard', status: 'development', importance: 'high', roles: ['instructor', 'admin'], category: 'Instructor' },
  { path: '/instructor/courses', component: 'CoursesList', status: 'development', importance: 'high', roles: ['instructor', 'admin'], category: 'Instructor' },
  { path: '/instructor/courses/create', component: 'CreateCourse', status: 'development', importance: 'high', roles: ['instructor', 'admin'], category: 'Instructor' },
  
  // Missing routes (marked as not implemented)
  { path: '/community', component: 'Community', status: 'not-implemented', importance: 'medium', roles: ['student', 'instructor', 'admin'], category: 'Community' },
  { path: '/messages', component: 'Messages', status: 'development', importance: 'medium', roles: ['student', 'instructor', 'admin'], category: 'Communication' },
  { path: '/notifications', component: 'Notifications', status: 'development', importance: 'medium', roles: ['student', 'instructor', 'admin'], category: 'Communication' },
  { path: '/calendar', component: 'Calendar', status: 'development', importance: 'low', roles: ['student', 'instructor', 'admin'], category: 'Organization' },
  { path: '/admin/navigation', component: 'NavigationExplorer', status: 'active', importance: 'medium', roles: ['admin', 'sistemas'], category: 'System' },
  { path: '/admin/pages', component: 'PageManagement', status: 'development', importance: 'medium', roles: ['admin', 'sistemas'], category: 'Content' },
  { path: '/admin/settings', component: 'SystemSettings', status: 'development', importance: 'medium', roles: ['admin', 'sistemas'], category: 'System' }
];

const NavigationExplorer: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<UserRoleType | 'all'>('all');
  const [view, setView] = useState<'table' | 'grid'>('table');
  
  // Filter routes based on current filters
  const filteredRoutes = routes.filter(route => {
    // Filter by status
    if (filter !== 'all' && route.status !== filter) {
      return false;
    }
    
    // Filter by role
    if (roleFilter !== 'all' && !route.roles.includes(roleFilter)) {
      return false;
    }
    
    return true;
  });
  
  // Group routes by category
  const routesByCategory = filteredRoutes.reduce((acc: Record<string, Route[]>, route) => {
    if (!acc[route.category]) {
      acc[route.category] = [];
    }
    acc[route.category].push(route);
    return acc;
  }, {});

  return (
    <AdminPageLayout
      title="Explorador de Navegación"
      subtitle="Visualiza la estructura completa de rutas de la aplicación"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="mr-2 h-5 w-5" />
            Mapa de Rutas
          </CardTitle>
          <CardDescription>
            Explora todas las rutas definidas en la aplicación, su estado, importancia y accesibilidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Tabs value={filter} onValueChange={setFilter as any} className="w-full max-w-md">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="development">En desarrollo</TabsTrigger>
                <TabsTrigger value="not-implemented">Pendientes</TabsTrigger>
                <TabsTrigger value="deprecated">Deprecadas</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2">
              <Button 
                variant={view === 'table' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setView('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'grid' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setView('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-medium block mb-2">Filtrar por Rol:</label>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={roleFilter === 'all' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => setRoleFilter('all')}
              >
                Todos
              </Badge>
              {Object.entries(roleNames).map(([role, name]) => (
                <Badge 
                  key={role}
                  variant={roleFilter === role ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setRoleFilter(role as UserRoleType)}
                >
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          
          {view === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Componente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Importancia</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Roles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map(route => {
                    const statusBadge = getStatusBadge(route.status);
                    
                    return (
                      <TableRow key={route.path}>
                        <TableCell className="font-mono text-sm">
                          {route.path}
                          {route.status === 'active' && (
                            <Link to={route.path} target="_blank" className="ml-2 inline-block align-middle text-primary hover:text-primary/80">
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </TableCell>
                        <TableCell>{route.component}</TableCell>
                        <TableCell>
                          <Badge variant={statusBadge.variant} className="flex items-center w-fit">
                            {statusBadge.icon}
                            {route.status === 'active' ? 'Activa' : 
                             route.status === 'development' ? 'En desarrollo' : 
                             route.status === 'not-implemented' ? 'No implementada' : 
                             route.status === 'duplicate' ? 'Duplicada' : 'Deprecada'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                            ${route.importance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                              route.importance === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}
                          `}>
                            {route.importance === 'high' ? 'Alta' : 
                             route.importance === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </TableCell>
                        <TableCell>{route.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {route.roles.map(role => (
                              <Badge key={role} variant="outline" className="mr-1 mb-1">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(routesByCategory).map(([category, categoryRoutes]) => (
                <div key={category}>
                  <h3 className="font-medium text-lg mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryRoutes.map(route => {
                      const statusBadge = getStatusBadge(route.status);
                      
                      return (
                        <Card key={route.path}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="font-mono text-sm font-medium truncate">
                                {route.path}
                              </div>
                              {route.status === 'active' && (
                                <Link to={route.path} target="_blank" className="text-primary hover:text-primary/80">
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                            <div className="text-sm mb-2">{route.component}</div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant={statusBadge.variant} className="flex items-center">
                                {statusBadge.icon}
                                {route.status === 'active' ? 'Activa' : 
                                 route.status === 'development' ? 'En desarrollo' : 
                                 route.status === 'not-implemented' ? 'No implementada' : 
                                 route.status === 'duplicate' ? 'Duplicada' : 'Deprecada'}
                              </Badge>
                              <Badge variant="outline" className={`
                                ${route.importance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                                  route.importance === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
                                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}
                              `}>
                                {route.importance === 'high' ? 'Alta' : 
                                 route.importance === 'medium' ? 'Media' : 'Baja'}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {route.roles.map(role => (
                                <Badge key={role} variant="outline" className="mr-1 mb-1">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p>Notas:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li><Badge variant="success" className="mr-2">Activa</Badge> La ruta está implementada y funcional.</li>
          <li><Badge variant="default" className="mr-2">En desarrollo</Badge> La ruta está parcialmente implementada.</li>
          <li><Badge variant="destructive" className="mr-2">No implementada</Badge> La ruta está definida pero sin implementación.</li>
          <li><Badge variant="secondary" className="mr-2">Duplicada</Badge> Existen múltiples implementaciones para la misma ruta.</li>
          <li><Badge variant="outline" className="mr-2">Deprecada</Badge> La ruta será eliminada en futuras versiones.</li>
        </ul>
      </div>
    </AdminPageLayout>
  );
};

export default NavigationExplorer;
