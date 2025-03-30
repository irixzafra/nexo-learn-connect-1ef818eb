
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp, ChevronUpDown } from 'lucide-react';
import { SortField, SortDirection } from '../../hooks/useCoursesTable';

interface CourseTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const CourseTableHeader: React.FC<CourseTableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort
}) => {
  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ChevronUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="cursor-pointer hover:bg-muted/20"
          onClick={() => onSort('title')}
        >
          <div className="flex items-center">
            Título
            <SortIcon field="title" />
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/20"
          onClick={() => onSort('instructor')}
        >
          <div className="flex items-center">
            Instructor
            <SortIcon field="instructor" />
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/20"
          onClick={() => onSort('price')}
        >
          <div className="flex items-center">
            Precio
            <SortIcon field="price" />
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/20"
          onClick={() => onSort('status')}
        >
          <div className="flex items-center">
            Estado
            <SortIcon field="status" />
          </div>
        </TableHead>
        <TableHead>
          Estudiantes
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/20"
          onClick={() => onSort('created_at')}
        >
          <div className="flex items-center">
            Fecha
            <SortIcon field="created_at" />
          </div>
        </TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CourseTableHeader;
