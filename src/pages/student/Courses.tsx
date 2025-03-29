
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useEnrolledCourses } from "@/features/courses/hooks/useEnrolledCourses";
import { EnrolledCoursesList } from "@/features/courses/components/EnrolledCoursesList";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StudentCourses: React.FC = () => {
  const { user } = useAuth();
  const { enrolledCourses, isLoading, error } = useEnrolledCourses(user?.id);

  const retryFetch = () => {
    // React Query will automatically refetch when we invalidate the query
    // This is just a placeholder for the button click handler
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Cursos</h1>
      
      {error && (
        <Card className="mb-6 border-destructive bg-destructive/10">
          <CardContent className="flex items-center gap-2 py-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive">Error al cargar tus cursos. Por favor, inténtalo de nuevo más tarde.</p>
          </CardContent>
          <CardFooter className="border-t pt-4 bg-background/50">
            <Button variant="outline" onClick={retryFetch}>
              Intentar de nuevo
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <EnrolledCoursesList courses={enrolledCourses} isLoading={isLoading} />
    </div>
  );
};

export default StudentCourses;
