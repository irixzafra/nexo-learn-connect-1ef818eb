import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentlyViewedCourses } from "@/features/courses/components/RecentlyViewedCourses";
import { connectionService } from "@/lib/offline/connectionService";
import { Clock, BookOpen } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const isOnline = connectionService.isCurrentlyOnline();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Hola, {user?.user_metadata?.full_name || 'Estudiante'}
      </h1>
      
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
