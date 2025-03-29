
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MessageSquare, GraduationCap, Award, Compass } from 'lucide-react';

const Home: React.FC = () => {
  const { user, profile, userRole } = useAuth();

  // Obtener la hora del día para personalizar el saludo
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 18) return "¡Buenas tardes";
    return "¡Buenas noches";
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Usuario'}!
          </h1>
          <p className="text-muted-foreground">
            Bienvenido a la plataforma de aprendizaje. Aquí tienes un resumen de tu actividad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Continuar Aprendiendo</CardTitle>
              <CardDescription>Retoma donde lo dejaste</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Desarrollo Web Full Stack</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Progreso: 68%</span>
                    <div className="w-24 h-1.5 ml-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link to="/my-courses">Ir a Mis Cursos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Próximas Clases</CardTitle>
              <CardDescription>Eventos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-700 dark:text-blue-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Clase de React Avanzado</p>
                    <p className="text-sm text-muted-foreground">Hoy, 18:00 - 19:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-700 dark:text-purple-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Sesión Q&A con tutor</p>
                    <p className="text-sm text-muted-foreground">Mañana, 10:00 - 11:00</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link to="/calendar">Ver Calendario</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Logros</CardTitle>
              <CardDescription>Tus estadísticas de aprendizaje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="h-10 w-10 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-700 dark:text-green-400 mb-1">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Cursos completados</p>
                </div>
                <div className="text-center">
                  <div className="h-10 w-10 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-1">
                    <Award className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Certificados</p>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link to="/profile">Ver mi Perfil</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Descubre nuevos cursos</h2>
              <p className="text-muted-foreground mb-4 md:mb-0 max-w-lg">
                Explora nuestra biblioteca de cursos y amplía tus conocimientos con las últimas tecnologías y metodologías.
              </p>
            </div>
            <Button size="lg" asChild className="gap-2">
              <Link to="/courses">
                <Compass className="h-5 w-5" />
                Explorar Cursos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
