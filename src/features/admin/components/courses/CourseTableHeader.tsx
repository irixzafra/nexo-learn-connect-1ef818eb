
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';

export type SortField = 'title' | 'instructor' | 'price' | 'status' | 'created_at';
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
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };
  
  const createSortableHeader = (field: SortField, label: string) => (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={() => onSort(field)}
    >
      {label}
      {renderSortIcon(field)}
    </div>
  );
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{createSortableHeader('title', 'Título')}</TableHead>
        <TableHead>{createSortableHeader('instructor', 'Instructor')}</TableHead>
        <TableHead>{createSortableHeader('price', 'Precio')}</TableHead>
        <TableHead>{createSortableHeader('status', 'Estado')}</TableHead>
        <TableHead>{createSortableHeader('created_at', 'Fecha')}</TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CourseTableHeader;
