
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, Users } from 'lucide-react';

interface CourseActionsDropdownProps {
  courseId: string;
  courseTitle: string;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
}

const CourseActionsDropdown: React.FC<CourseActionsDropdownProps> = ({
  courseId,
  courseTitle,
  onViewDetails,
  onEdit,
  onEnrollUsers
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
        <DropdownMenuItem onClick={() => onViewDetails(courseId)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Ver detalles</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(courseId)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEnrollUsers(courseId, courseTitle)}>
          <Users className="mr-2 h-4 w-4" />
          <span>Inscribir usuarios</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
