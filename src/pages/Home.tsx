
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Calendar, MessageSquare, GraduationCap, Award, 
  Compass, Sparkles, Layers, Clock, TrendingUp 
} from 'lucide-react';

const Home: React.FC = () => {
  const { user, profile, userRole } = useAuth();

  // Obtener la hora del día para personalizar el saludo
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <SectionPageLayout
      header={{
        title: `${getGreeting()}, ${profile?.full_name?.split(' ')[0] || 'Usuario'}`,
        description: 'Bienvenido a la plataforma de aprendizaje. Aquí tienes un resumen de tu actividad.',
      }}
      stats={{
        stats: [
          {
            label: "Cursos activos",
            value: "3",
            icon: <BookOpen className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Horas esta semana",
            value: "12",
            icon: <Clock className="h-5 w-5" />,
            color: "success"
          },
          {
            label: "Certificados",
            value: "8",
            icon: <Award className="h-5 w-5" />,
            color: "warning"
          },
          {
            label: "Días consecutivos",
            value: "23",
            change: { value: 15, type: "increase" },
            icon: <TrendingUp className="h-5 w-5" />,
            color: "success"
          }
        ]
      }}
      help={{
        title: "Tu progreso",
        description: "Recursos para ayudarte a continuar tu aprendizaje.",
        links: [
          {
            title: "Completar perfil",
            description: "Actualiza tu información personal y preferencias",
            href: "/profile"
          },
          {
            title: "Centro de ayuda",
            description: "Consulta la documentación y tutoriales",
            href: "/help",
            external: true
          }
        ]
      }}
    >
      {/* Sección principal - Continuar aprendiendo */}
      <PageSection 
        title="Continuar aprendiendo" 
        description="Retoma donde lo dejaste"
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col bg-secondary/30 dark:bg-secondary/30 rounded-lg p-4 hover-lift">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-md bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Desarrollo Web Full Stack</p>
                <p className="text-sm text-muted-foreground">Módulo 3: React avanzado</p>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progreso: 68%</span>
                <span className="text-primary">12/18 lecciones</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col bg-secondary/30 dark:bg-secondary/30 rounded-lg p-4 hover-lift">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-md bg-blue-500/10 flex items-center justify-center">
                <Layers className="h-7 w-7 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Diseño UX/UI para desarrolladores</p>
                <p className="text-sm text-muted-foreground">Módulo 1: Fundamentos</p>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progreso: 24%</span>
                <span className="text-blue-500">4/16 lecciones</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button asChild>
            <Link to="/my-courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Continuar aprendiendo
            </Link>
          </Button>
        </div>
      </PageSection>

      {/* Segunda fila - Próximas clases y Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Columna próximas clases */}
        <PageSection
          title="Próximas clases"
          description="Eventos programados"
          variant="card"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
              <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Clase de React Avanzado</p>
                <p className="text-sm text-muted-foreground">Hoy, 18:00 - 19:30</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
              <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Sesión Q&A con tutor</p>
                <p className="text-sm text-muted-foreground">Mañana, 10:00 - 11:00</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/calendar" className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Ver calendario
              </Link>
            </Button>
          </div>
        </PageSection>

        {/* Columna logros */}
        <PageSection
          title="Logros"
          description="Tus estadísticas de aprendizaje"
          variant="card"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
              <div className="h-10 w-10 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Estudiante consistente</p>
                <p className="text-sm text-muted-foreground">Completaste 5 lecciones esta semana</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
              <div className="h-10 w-10 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Masterización de contenido</p>
                <p className="text-sm text-muted-foreground">90% de aciertos en el último quiz</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/profile" className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4" />
                Ver mi perfil
              </Link>
            </Button>
          </div>
        </PageSection>
      </div>

      {/* Banner de exploración */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30 shadow-md border-none animate-scale-in hover-lift">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Descubre nuevos cursos</h2>
              <p className="text-muted-foreground max-w-lg">
                Explora nuestra biblioteca de cursos y amplía tus conocimientos con las últimas tecnologías y metodologías.
              </p>
            </div>
            <Button size="lg" asChild className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-md">
              <Link to="/courses">
                <Compass className="h-5 w-5" />
                Explorar cursos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </SectionPageLayout>
  );
};

export default Home;
