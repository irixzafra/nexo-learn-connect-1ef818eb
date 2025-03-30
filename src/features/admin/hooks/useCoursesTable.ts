
import { useState, useMemo } from 'react';
import { Course } from '../hooks/useAdminCourses';

export type SortField = 'title' | 'instructor' | 'price' | 'status' | 'created_at' | 'students_count';
export type SortDirection = 'asc' | 'desc';

interface UseCoursesTableProps {
  courses: Course[];
  searchTerm: string;
}

export const useCoursesTable = ({ courses, searchTerm }: UseCoursesTableProps) => {
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return courses.filter(course => 
      course.title?.toLowerCase().includes(lowercaseSearch) ||
      course.instructors?.full_name?.toLowerCase().includes(lowercaseSearch)
    );
  }, [courses, searchTerm]);
  
  // Sort courses based on sort field and direction
  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        case 'instructor':
          aValue = a.instructors?.full_name?.toLowerCase() || '';
          bValue = b.instructors?.full_name?.toLowerCase() || '';
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'status':
          aValue = a.status?.toLowerCase() || '';
          bValue = b.status?.toLowerCase() || '';
          break;
        case 'students_count':
          aValue = a.students_count || 0;
          bValue = b.students_count || 0;
          break;
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        default:
          return 0;
      }
      
      const compareResult = typeof aValue === 'string'
        ? aValue.localeCompare(bValue as string)
        : (aValue as number) - (bValue as number);
        
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [filteredCourses, sortField, sortDirection]);
  
  // Calculate pagination
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCourses, currentPage, itemsPerPage]);
  
  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / itemsPerPage));
  
  // Handle sort toggle
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return {
    sortField,
    sortDirection,
    currentPage,
    totalPages,
    paginatedCourses,
    handleSort,
    handlePageChange,
  };
};
