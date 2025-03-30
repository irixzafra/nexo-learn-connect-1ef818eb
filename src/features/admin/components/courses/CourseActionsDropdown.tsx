
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
  course: Course;
  onDelete: (courseId: string) => void;
}

const CourseActionsDropdown: React.FC<CourseActionsDropdownProps> = ({
  course,
  onDelete,
}) => {
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
        <DropdownMenuItem asChild>
          <Link to={`/admin/courses/${course.id}`} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/courses/${course.id}`} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            <span>Vista previa</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/admin/courses/${course.id}/students`} className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Estudiantes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/admin/courses/${course.id}/settings`} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(course.id)}
          className="text-destructive cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
