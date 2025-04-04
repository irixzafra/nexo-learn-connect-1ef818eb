
import React from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit, Eye, Trash, Users, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { toast } from 'sonner';

interface CourseActionsDropdownProps {
  course?: Course;
  courseId?: string;
  courseTitle?: string;
  onDelete?: (courseId: string) => void;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onEnrollUsers?: (id: string, title: string) => void;
}

const CourseActionsDropdown: React.FC<CourseActionsDropdownProps> = ({
  course,
  courseId,
  courseTitle,
  onDelete,
  onViewDetails,
  onEdit,
  onEnrollUsers,
}) => {
  const { navigateTo } = useAppNavigation();
  
  // Use course.id if course is provided, otherwise use courseId
  const id = course?.id || courseId || '';
  // Use course.title if course is provided, otherwise use courseTitle
  const title = course?.title || courseTitle || '';

  const handleAction = (action: string) => {
    if (!id) {
      toast.error("No se pudo completar la acción", {
        description: "ID de curso no disponible"
      });
      return;
    }
    
    switch (action) {
      case 'view':
        if (onViewDetails) {
          onViewDetails(id);
        } else {
          navigateTo(`/courses/${id}`);
        }
        break;
      case 'edit':
        if (onEdit) {
          onEdit(id);
        } else {
          navigateTo(`/admin/courses/${id}`);
        }
        break;
      case 'students':
        if (onEnrollUsers) {
          onEnrollUsers(id, title);
        } else {
          navigateTo(`/admin/courses/${id}/students`);
        }
        break;
      case 'settings':
        navigateTo(`/admin/courses/${id}/settings`);
        break;
      case 'delete':
        if (onDelete) {
          onDelete(id);
        } else {
          toast.warning("Función de eliminación no implementada");
        }
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('view')} className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" />
          <span>Vista previa</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleAction('edit')} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleAction('students')} className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          <span>Estudiantes</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleAction('settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {onDelete && (
          <DropdownMenuItem
            onClick={() => handleAction('delete')}
            className="text-destructive cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
