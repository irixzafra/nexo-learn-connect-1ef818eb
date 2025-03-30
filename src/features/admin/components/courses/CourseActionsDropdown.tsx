
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
  // Use course.id if course is provided, otherwise use courseId
  const id = course?.id || courseId || '';
  // Use course.title if course is provided, otherwise use courseTitle
  const title = course?.title || courseTitle || '';

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
        
        {onViewDetails ? (
          <DropdownMenuItem onClick={() => onViewDetails(id)} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            <span>Vista previa</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to={`/admin/courses/${id}`} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Link>
          </DropdownMenuItem>
        )}

        {onEdit ? (
          <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to={`/courses/${id}`} className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              <span>Vista previa</span>
            </Link>
          </DropdownMenuItem>
        )}

        {onEnrollUsers ? (
          <DropdownMenuItem onClick={() => onEnrollUsers(id, title)} className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Estudiantes</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to={`/admin/courses/${id}/students`} className="cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Estudiantes</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link to={`/admin/courses/${id}/settings`} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {onDelete ? (
          <DropdownMenuItem
            onClick={() => onDelete(id)}
            className="text-destructive cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
