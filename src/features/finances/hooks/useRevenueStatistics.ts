
import { useState, useCallback, useEffect } from 'react';

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  averageLifetimeValue: number;
  conversionRate: number;
  topCoursesByRevenue: Array<{
    id: string;
    title: string;
    category: string;
    revenue: number;
    sales: number;
  }>;
}

interface RevenueByMonth {
  month: string;
  revenue: number;
}

interface RevenueByCourse {
  name: string;
  value: number;
}

export const useRevenueStatistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenueStats, setRevenueStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageLifetimeValue: 0,
    conversionRate: 0,
    topCoursesByRevenue: []
  });
  const [revenueByMonth, setRevenueByMonth] = useState<RevenueByMonth[]>([]);
  const [revenueByCourse, setRevenueByCourse] = useState<RevenueByCourse[]>([]);

  // Función para obtener todas las estadísticas
  const fetchAllStatistics = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulamos datos para fines de demostración
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Estadísticas generales de ingresos
      setRevenueStats({
        totalRevenue: 156480,
        monthlyRevenue: 24350,
        averageLifetimeValue: 245.75,
        conversionRate: 8.4,
        topCoursesByRevenue: [
          { id: '1', title: 'Desarrollo Web Completo', category: 'Desarrollo Web', revenue: 42150, sales: 843 },
          { id: '2', title: 'JavaScript Moderno', category: 'Programación', revenue: 35680, sales: 713 },
          { id: '3', title: 'Diseño UX/UI Profesional', category: 'Diseño', revenue: 28475, sales: 569 },
          { id: '4', title: 'React desde Cero', category: 'Frontend', revenue: 23400, sales: 468 },
          { id: '5', title: 'Machine Learning', category: 'Ciencia de Datos', revenue: 18750, sales: 375 }
        ]
      });
      
      // Ingresos por mes (últimos 12 meses)
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const revenueData = [];
      
      // Generamos datos con una tendencia creciente con algunos altibajos
      let baseRevenue = 15000;
      for (let i = 0; i < 12; i++) {
        // Añadir variaciones aleatorias
        const variation = (Math.random() * 0.3 - 0.1) * baseRevenue; // -10% a +20%
        
        // Añadir tendencia creciente
        const trendGrowth = i * 350;
        
        // Temporadas altas (fin de año y comienzo de curso)
        let seasonalBoost = 0;
        if (i === 0 || i === 1 || i === 8 || i === 9) { // Ene, Feb, Sep, Oct
          seasonalBoost = 2500;
        }
        
        const monthRevenue = Math.max(baseRevenue + variation + trendGrowth + seasonalBoost, 10000);
        
        revenueData.push({
          month: months[i],
          revenue: Math.round(monthRevenue)
        });
      }
      
      setRevenueByMonth(revenueData);
      
      // Ingresos por categoría de curso
      setRevenueByCourse([
        { name: 'Desarrollo Web', value: 42150 },
        { name: 'Programación', value: 35680 },
        { name: 'Diseño', value: 28475 },
        { name: 'Frontend', value: 23400 },
        { name: 'Ciencia de Datos', value: 18750 }
      ]);
    } catch (error) {
      console.error('Error al cargar estadísticas de ingresos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Cargar datos al montar el componente
  useEffect(() => {
    fetchAllStatistics();
  }, [fetchAllStatistics]);
  
  return {
    revenueStats,
    revenueByMonth,
    revenueByCourse,
    isLoading,
    refetchAll: fetchAllStatistics
  };
};
