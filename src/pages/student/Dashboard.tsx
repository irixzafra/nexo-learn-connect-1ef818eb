
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
  const { isActive } = useOnboarding();

  // Check if the user is new (created within the last 7 days)
  const isNewUser = user?.created_at && 
    new Date(user.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Hola, {user?.user_metadata?.full_name || 'Estudiante'}
        </h1>
        
        {/* Show onboarding trigger with autoStart for new users */}
        {isNewUser && !isActive && (
          <div className="hidden sm:block">
            <OnboardingTrigger autoStart={true} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          {/* Contenido principal del dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mis cursos en progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Contenido de mis cursos */}
            </CardContent>
          </Card>
          
          {/* Otros componentes del dashboard */}
        </div>
        
        <div className="md:col-span-4 space-y-6">
          {/* Sidebar - Agregar componente de cursos vistos recientemente */}
          <RecentlyViewedCourses limit={3} />
          
          {/* Otros componentes del sidebar */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
