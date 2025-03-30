
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type SortField = 'title' | 'instructor' | 'status' | 'price' | 'students_count' | 'updated_at';
export type SortDirection = 'asc' | 'desc';

interface CourseTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const CourseTableHeader: React.FC<CourseTableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? 
        <ChevronUp className="ml-1 h-4 w-4" /> : 
        <ChevronDown className="ml-1 h-4 w-4" />;
    }
    return null;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('title')}
          >
            Título
            {renderSortIcon('title')}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('instructor')}
          >
            Instructor
            {renderSortIcon('instructor')}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('status')}
          >
            Estado
            {renderSortIcon('status')}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('price')}
          >
            Precio
            {renderSortIcon('price')}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('students_count')}
          >
            Estudiantes
            {renderSortIcon('students_count')}
          </Button>
        </TableHead>
        <TableHead>
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium flex items-center"
            onClick={() => onSort('updated_at')}
          >
            Última Actualización
            {renderSortIcon('updated_at')}
          </Button>
        </TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CourseTableHeader;
