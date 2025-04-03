
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface InstructorCoursesEmptyStateProps {
  searchTerm: string;
  activeTab: string;
  onCreateCourse: () => void;
}

export const InstructorCoursesEmptyState: React.FC<InstructorCoursesEmptyStateProps> = ({
  searchTerm,
  activeTab,
  onCreateCourse
}) => {
  return (
    <Card className="text-center p-12">
      <CardHeader>
        <CardTitle>No hay cursos</CardTitle>
        <CardDescription>
          {searchTerm ? (
            `No se encontraron cursos que coincidan con "${searchTerm}"`
          ) : activeTab === 'drafts' ? (
            'No tienes cursos en borrador'
          ) : activeTab === 'published' ? (
            'No tienes cursos publicados'
          ) : (
            'Aún no has creado ningún curso'
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center pt-4">
        <Button onClick={onCreateCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Crear tu primer curso
        </Button>
      </CardFooter>
    </Card>
  );
};
