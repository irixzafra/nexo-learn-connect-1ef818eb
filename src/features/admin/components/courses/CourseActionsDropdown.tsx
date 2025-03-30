
import React from 'react';
import { Eye, Pencil, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  onEnrollUsers,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Abrir menú</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(courseId)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Ver detalles</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(courseId)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Editar curso</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEnrollUsers(courseId, courseTitle)}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Matricular usuarios</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
