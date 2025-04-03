
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface InstructorCoursesHeaderProps {
  onCreateCourse: () => void;
}

export const InstructorCoursesHeader: React.FC<InstructorCoursesHeaderProps> = ({ 
  onCreateCourse 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Mis Cursos</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona, crea y edita tus cursos
        </p>
      </div>
      <Button onClick={onCreateCourse}>
        <Plus className="h-4 w-4 mr-2" />
        Crear nuevo curso
      </Button>
    </div>
  );
};
