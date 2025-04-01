
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentlyViewedCourses } from "@/features/courses/components/RecentlyViewedCourses";
import { connectionService } from "@/lib/offline/connectionService";
import { Clock, BookOpen } from "lucide-react";
import { OnboardingTrigger } from "@/components/onboarding/OnboardingTrigger";
import { useOnboarding } from "@/contexts/OnboardingContext";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const isOnline = connectionService.isCurrentlyOnline();
  const { isActive, openOnboarding } = useOnboarding();

  // Check if the user is new (created within the last 7 days)
  const isNewUser = user?.created_at && 
    new Date(user.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Hola, {user?.user_metadata?.full_name || 'Estudiante'}
        </h1>
        
        {/* Show onboarding trigger for new users */}
        {isNewUser && !isActive && (
          <div className="hidden sm:block">
            <OnboardingTrigger onClick={openOnboarding} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Cursos en progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">2 cursos activos esta semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Próximas clases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Próxima clase: 2h 15m</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tareas pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">2 tareas para esta semana</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">Continuar aprendiendo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <RecentlyViewedCourses />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">Logros</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Has completado 2 de 10 cursos en tu ruta de aprendizaje actual.</p>
              
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "20%" }}></div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">20% completado</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {!isOnline && (
        <div className="mt-6 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
          <p className="text-sm">Estás navegando en modo sin conexión. Algunas funciones pueden estar limitadas.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
