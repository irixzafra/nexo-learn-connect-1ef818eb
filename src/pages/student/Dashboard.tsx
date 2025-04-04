
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, BookOpen, Award, Clock, ArrowRight } from 'lucide-react';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { StatsSection } from '@/components/dashboard/StatsSection';
import UpcomingClassesSection from '@/features/home/components/UpcomingClassesSection';
import ContinueLearningSection from '@/features/home/components/ContinueLearningSection';
import OnboardingTrigger from '@/components/onboarding/OnboardingTrigger';
import { useOnboarding } from '@/hooks/useOnboarding';
import AchievementsSection from '@/features/home/components/AchievementsSection';
import ExploreCoursesCard from '@/features/home/components/ExploreCoursesCard';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { startOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleStartOnboarding = () => {
    toast.success("Iniciando el tour de bienvenida");
    startOnboarding();
  };

  const navigateToCourses = () => {
    navigate('/app/course');
  };

  return (
    <div className="space-y-4 p-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de control</h1>
          <p className="text-muted-foreground">
            Bienvenido a tu panel de control. Aquí puedes ver tus cursos, progreso y actividades.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex justify-end">
          <Button variant="outline" className="mr-2" onClick={handleStartOnboarding}>
            Tour de bienvenida
          </Button>
          <Button onClick={navigateToCourses}>
            Explorar cursos
          </Button>
        </div>
      </div>

      <WelcomeSection 
        title="Bienvenido" 
        description="Aquí puedes ver un resumen de tu actividad reciente" 
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Próximamente</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center">
            <Award className="mr-2 h-4 w-4" />
            <span>Logros</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <StatsSection stats={[
            { 
              label: "Cursos Activos", 
              value: "3", 
              icon: <BookOpen className="h-4 w-4" />,
              action: { label: "Ver todos", onClick: () => navigate('/app/my-courses') }
            },
            { 
              label: "Horas de Estudio", 
              value: "28", 
              icon: <Clock className="h-4 w-4" />,
              action: { label: "Detalles", onClick: () => navigate('/app/analytics/personal') }
            },
            { 
              label: "Tareas Completadas", 
              value: "12", 
              icon: <Award className="h-4 w-4" />,
              action: { label: "Ver todas", onClick: () => navigate('/app/my-courses/completed') }
            },
            { 
              label: "Próximas Clases", 
              value: "5", 
              icon: <CalendarDays className="h-4 w-4" />,
              action: { label: "Calendario", onClick: () => navigate('/app/calendar') }
            }
          ]} />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <ContinueLearningSection />
            <ExploreCoursesCard 
              onClick={() => navigate('/app/course')}
            />
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Rutas de aprendizaje recomendadas</CardTitle>
              <CardDescription>Basadas en tus intereses y nivel de habilidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-medium">Desarrollo Web Full-Stack</h3>
                    <p className="text-sm text-muted-foreground">12 cursos · 48 horas estimadas</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/app/learning-paths')}>
                    Ver ruta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-medium">Inteligencia Artificial para Desarrolladores</h3>
                    <p className="text-sm text-muted-foreground">8 cursos · 32 horas estimadas</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/app/learning-paths')}>
                    Ver ruta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingClassesSection />
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate('/app/calendar')} className="w-full max-w-xs">
              Ver calendario completo
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <AchievementsSection />
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate('/app/achievements')} className="w-full max-w-xs">
              Ver todos los logros
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
