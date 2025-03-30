
import React from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import CourseTableHeader, { SortField, SortDirection } from './CourseTableHeader';
import CoursesList from './CoursesList';
import { Course } from '../../hooks/useAdminCourses';
import { formatPrice, formatDate } from '../../utils/formatters';

interface CourseTableProps {
  courses: Course[];
  searchTerm: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
  isLoading?: boolean;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  searchTerm,
  sortField,
  sortDirection,
  onSort,
  onViewDetails,
  onEdit,
  onEnrollUsers,
  isLoading = false
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <CourseTableHeader 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort} 
        />
        <TableBody>
          <CoursesList
            courses={courses}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onEnrollUsers={onEnrollUsers}
            searchTerm={searchTerm}
            formatPrice={formatPrice}
            formatDate={formatDate}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
