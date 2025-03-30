
import { useMemo, useState } from 'react';
import { EnrolledStudent } from './useCourseEnrollments';

export type SortField = 'full_name' | 'email' | 'enrolled_at';
export type SortDirection = 'asc' | 'desc';

export function useEnrolledStudentsTable(enrolledStudents: EnrolledStudent[]) {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para la ordenación
  const [sortField, setSortField] = useState<SortField>('enrolled_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filtrar estudiantes basado en el término de búsqueda
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return enrolledStudents;
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    return enrolledStudents.filter(student => {
      const fullName = student.full_name?.toLowerCase() || '';
      const email = student.email?.toLowerCase() || '';
      
      return fullName.includes(normalizedSearch) || email.includes(normalizedSearch);
    });
  }, [enrolledStudents, searchTerm]);

  // Ordenar estudiantes filtrados
  const sortedStudents = useMemo(() => {
    if (!filteredStudents.length) return filteredStudents;
    
    return [...filteredStudents].sort((a, b) => {
      if (sortField === 'enrolled_at') {
        // Ordenar por fecha
        const dateA = new Date(a.enrolled_at).getTime();
        const dateB = new Date(b.enrolled_at).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === 'full_name') {
        // Ordenar por nombre, manejar valores nulos
        const nameA = a.full_name || '';
        const nameB = b.full_name || '';
        return sortDirection === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      }
      
      if (sortField === 'email') {
        // Ordenar por email, manejar valores nulos
        const emailA = a.email || '';
        const emailB = b.email || '';
        return sortDirection === 'asc' 
          ? emailA.localeCompare(emailB) 
          : emailB.localeCompare(emailA);
      }
      
      return 0;
    });
  }, [filteredStudents, sortField, sortDirection]);

  // Manejador para cambiar el campo y dirección de ordenación
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Si el campo es el mismo, invertir la dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un campo nuevo, establecerlo y ordenar descendente por defecto
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    sortedStudents
  };
}
