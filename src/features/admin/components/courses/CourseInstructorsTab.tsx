
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog } from 'lucide-react';

interface CourseInstructorsTabProps {
  courseId: string;
  courseName: string;
}

const CourseInstructorsTab: React.FC<CourseInstructorsTabProps> = ({ courseId, courseName }) => {
  const { data: instructor, isLoading } = useQuery({
    queryKey: ['courseInstructor', courseId],
    queryFn: async () => {
      const { data: course, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (
            id,
            full_name,
            email
          )
        `)
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      return course.profiles;
    }
  });

  if (isLoading) {
    return (
      <PageSection variant="card" title="Instructores del Curso" description="Gestión de instructores">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant="card" title="Instructores del Curso" description="Gestión de instructores">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Instructor Principal</CardTitle>
            <CardDescription>El instructor principal es responsable del contenido del curso</CardDescription>
          </CardHeader>
          <CardContent>
            {instructor ? (
              <div className="p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCog className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{instructor.full_name}</p>
                    <p className="text-sm text-muted-foreground">{instructor.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p>No se ha asignado un instructor a este curso.</p>
              </div>
            )}

            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <UserCog className="h-4 w-4 mr-2" />
                Cambiar Instructor
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Co-instructores</CardTitle>
            <CardDescription>Instructores adicionales que colaboran en el curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p>No hay co-instructores asignados a este curso.</p>
              <Button variant="outline" className="mt-4">
                <UserCog className="h-4 w-4 mr-2" />
                Añadir Co-instructor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
};

export default CourseInstructorsTab;
