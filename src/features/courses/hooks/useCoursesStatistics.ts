
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CourseStats {
  totalCourses: number;
  activeCourses: number;
  totalEnrollments: number;
  avgDurationHours: number;
  topCourses: Array<{
    id: string;
    title: string;
    categoryName: string;
    enrollments: number;
  }>;
}

interface EnrollmentTrend {
  date: string;
  count: number;
}

export const useCoursesStatistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseStats, setCourseStats] = useState<CourseStats>({
    totalCourses: 0,
    activeCourses: 0,
    totalEnrollments: 0,
    avgDurationHours: 0,
    topCourses: []
  });
  const [enrollmentTrends, setEnrollmentTrends] = useState<EnrollmentTrend[]>([]);

  // Función para obtener todas las estadísticas
  const fetchAllStatistics = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulamos datos para fines de demostración
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Estadísticas de cursos
      setCourseStats({
        totalCourses: 124,
        activeCourses: 87,
        totalEnrollments: 3542,
        avgDurationHours: 18.5,
        topCourses: [
          { id: '1', title: 'Desarrollo Web Completo', categoryName: 'Desarrollo Web', enrollments: 584 },
          { id: '2', title: 'JavaScript Moderno', categoryName: 'Programación', enrollments: 473 },
          { id: '3', title: 'Diseño UX/UI Profesional', categoryName: 'Diseño', enrollments: 356 },
          { id: '4', title: 'React desde Cero', categoryName: 'Desarrollo Frontend', enrollments: 312 },
          { id: '5', title: 'Data Science: Análisis de Datos', categoryName: 'Ciencia de Datos', enrollments: 298 }
        ]
      });
      
      // Tendencias de inscripción (últimos 30 días)
      const today = new Date();
      const enrollmentData = [];
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Generar un patrón de crecimiento realista
        let baseCount = Math.floor(Math.random() * 15) + 5;
        
        // Añadir picos en ciertos días para simular eventos o promociones
        if (i % 7 === 0) baseCount += Math.floor(Math.random() * 20) + 10;
        
        // Tendencia de crecimiento general
        baseCount += Math.floor((30 - i) / 5);
        
        enrollmentData.push({
          date: date.toISOString().split('T')[0],
          count: baseCount
        });
      }
      
      setEnrollmentTrends(enrollmentData);
    } catch (error) {
      console.error('Error al cargar estadísticas de cursos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Cargar datos al montar el componente
  useEffect(() => {
    fetchAllStatistics();
  }, [fetchAllStatistics]);
  
  return {
    courseStats,
    enrollmentTrends,
    isLoading,
    refetchAll: fetchAllStatistics
  };
};
