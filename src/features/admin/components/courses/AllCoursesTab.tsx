
import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Course } from '../../hooks/useAdminCourses';
import CourseSearchBar from './CourseSearchBar';
import CoursesList from './CoursesList';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface AllCoursesTabProps {
  courses: Course[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
}

type SortField = 'title' | 'instructor' | 'status' | 'price' | 'students_count' | 'updated_at';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

const AllCoursesTab: React.FC<AllCoursesTabProps> = ({
  courses,
  isLoading,
  searchTerm,
  setSearchTerm,
  onViewDetails,
  onEdit,
  onEnrollUsers,
}) => {
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
    // First apply the search filter (maintaining existing functionality)
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

  // Format price with currency
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'eur' ? '€' : currency === 'usd' ? '$' : currency;
    return `${symbol}${price.toFixed(2)}`;
  };

  // Format date
  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'dd/MM/yyyy');
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <CardTitle>Lista de Cursos</CardTitle>
            <CardDescription>Gestiona todos los cursos de la plataforma</CardDescription>
          </div>
          <div className="mt-4 md:mt-0">
            <CourseSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('title')}
                      >
                        Título
                        {sortField === 'title' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('instructor')}
                      >
                        Instructor
                        {sortField === 'instructor' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('status')}
                      >
                        Estado
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('price')}
                      >
                        Precio
                        {sortField === 'price' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('students_count')}
                      >
                        Estudiantes
                        {sortField === 'students_count' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-medium flex items-center"
                        onClick={() => handleSort('updated_at')}
                      >
                        Última Actualización
                        {sortField === 'updated_at' && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <CoursesList
                    courses={sortedAndPaginatedCourses.courses}
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
            
            {/* Pagination */}
            {sortedAndPaginatedCourses.totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, sortedAndPaginatedCourses.totalPages) }, (_, i) => {
                      let pageNum;
                      if (sortedAndPaginatedCourses.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= sortedAndPaginatedCourses.totalPages - 2) {
                        pageNum = sortedAndPaginatedCourses.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            onClick={() => handlePageChange(pageNum)} 
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(sortedAndPaginatedCourses.totalPages, currentPage + 1))}
                        disabled={currentPage === sortedAndPaginatedCourses.totalPages}
                        aria-disabled={currentPage === sortedAndPaginatedCourses.totalPages}
                        className={currentPage === sortedAndPaginatedCourses.totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            <div className="mt-2 text-center text-sm text-muted-foreground">
              Mostrando {sortedAndPaginatedCourses.courses.length} de {sortedAndPaginatedCourses.totalItems} cursos
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AllCoursesTab;
