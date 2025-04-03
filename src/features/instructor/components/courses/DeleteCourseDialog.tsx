
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Course } from '@/types/course';

interface DeleteCourseDialogProps {
  course: Course | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({
  course,
  isOpen,
  onOpenChange,
  onConfirmDelete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        
        {course && (
          <div className="flex items-center gap-3 py-2">
            <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
              <img 
                src={course.cover_image_url || '/placeholder-course.jpg'} 
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                {course.is_published ? 'Publicado' : 'Borrador'} • 
                {course.student_count || 0} estudiantes
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={onConfirmDelete}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
