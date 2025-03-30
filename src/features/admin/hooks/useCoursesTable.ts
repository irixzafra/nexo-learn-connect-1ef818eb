
import { useState, useMemo } from 'react';
import { Course } from '../hooks/useAdminCourses';
import { SortField, SortDirection } from '../components/courses/CourseTableHeader';

const ITEMS_PER_PAGE = 10;

export const useCoursesTable = (courses: Course[], searchTerm: string) => {
  // Sorting state
  const [sortField, setSortField] = useState<SortField>('updated_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Calculate sorted and paginated data
  const sortedAndPaginatedCourses = useMemo(() => {
    // First apply the search filter
    const filteredCourses = searchTerm.trim() === '' 
      ? courses 
      : courses.filter(course => 
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructors?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Then sort
    const sorted = [...filteredCourses].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'title':
          comparison = (a.title || '').localeCompare(b.title || '');
          break;
        case 'instructor':
          comparison = (a.instructors?.full_name || '').localeCompare(b.instructors?.full_name || '');
          break;
        case 'status':
          const statusA = a.is_published ? 'published' : 'draft';
          const statusB = b.is_published ? 'published' : 'draft';
          comparison = statusA.localeCompare(statusB);
          break;
        case 'price':
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case 'students_count':
          comparison = (a.students_count || 0) - (b.students_count || 0);
          break;
        case 'updated_at':
          comparison = new Date(a.updated_at || 0).getTime() - new Date(b.updated_at || 0).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCourses = sorted.slice(startIndex, endIndex);
    
    return {
      courses: paginatedCourses,
      totalItems: sorted.length,
      totalPages
    };
  }, [courses, searchTerm, sortField, sortDirection, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    sortField,
    sortDirection,
    currentPage,
    sortedAndPaginatedCourses,
    handleSort,
    handlePageChange
  };
};
