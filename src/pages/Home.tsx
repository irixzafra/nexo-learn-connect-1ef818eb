
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Book, Calendar, ChevronRight, LucideCircleUser, UserPlus, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { user, profile, userRole } = useAuth();

  // Determinar las tarjetas a mostrar según el rol del usuario
  const showInstructorCards = userRole === 'instructor' || userRole === 'admin';
  const showAdminCards = userRole === 'admin';

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">¡Bienvenido, {profile?.full_name || user?.email?.split('@')[0]}!</h1>
          <p className="text-muted-foreground">Este es tu panel de control de Nexo Learning. Aquí tienes un resumen de tu actividad y recursos disponibles.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de perfil - Para todos los usuarios */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <LucideCircleUser className="mr-2 h-5 w-5 text-primary" />
                Mi Perfil
              </CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Nombre:</span> {profile?.full_name || 'No establecido'}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Rol:</span> <span className="capitalize">{profile?.role || 'No asignado'}</span></p>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/profile">
                  Ver perfil completo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Tarjeta de Mis Cursos - Para todos los usuarios */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-primary" />
                Mis Cursos
              </CardTitle>
              <CardDescription>Continúa tu aprendizaje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-muted rounded-full">
                <div className="h-2 w-1/3 bg-primary rounded-full"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">33% completado en total</p>
              <Button asChild className="w-full mt-4">
                <Link to="/my-courses">
                  Ver mis cursos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Calendario - Para todos los usuarios */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Calendario
              </CardTitle>
              <CardDescription>Próximos eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-3 shadow-sm">
                  <p className="font-medium">Sin eventos próximos</p>
                  <p className="text-sm text-muted-foreground">No tienes eventos programados para los próximos días.</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/calendar">
                  Ver calendario
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Tarjetas para instructores */}
          {showInstructorCards && (
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Mis Estudiantes
                </CardTitle>
                <CardDescription>Gestiona a tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold">0</span>
                  <span className="text-sm text-muted-foreground">Estudiantes activos</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/instructor/students">
                    Ver estudiantes
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Tarjetas para instructores */}
          {showInstructorCards && (
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-950/20 dark:to-amber-900/20 dark:border-amber-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Mis Cursos (Instructor)
                </CardTitle>
                <CardDescription>Gestiona tus cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold">0</span>
                  <span className="text-sm text-muted-foreground">Cursos publicados</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/instructor/courses">
                    Gestionar cursos
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Tarjetas para administradores */}
          {showAdminCards && (
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/20 dark:to-purple-900/20 dark:border-purple-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Gestión de Usuarios
                </CardTitle>
                <CardDescription>Administra usuarios del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold">-</span>
                  <span className="text-sm text-muted-foreground">Usuarios registrados</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/users">
                    Administrar usuarios
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Actividad Reciente</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm">Iniciaste sesión en el sistema</p>
                    <p className="text-xs text-muted-foreground">Hace un momento</p>
                  </div>
                </div>
                <div className="mt-4 text-center text-muted-foreground text-sm">
                  <p>No hay más actividades recientes para mostrar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
