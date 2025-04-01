
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFeature } from '@/hooks/useFeatures';
import { 
  BarChart3, 
  LineChart,
  UserCog,
  BookOpen,
  DollarSign,
  AlertTriangle,
  PieChart 
} from 'lucide-react';

// Importamos las secciones principales de cada área de analytics
import PlatformOverviewSection from './sections/PlatformOverviewSection';
import UserAnalyticsSection from './sections/UserAnalyticsSection';
import CoursesAnalyticsSection from './sections/CoursesAnalyticsSection';
import RevenueAnalyticsSection from './sections/RevenueAnalyticsSection';

const AnalyticsOverview: React.FC = () => {
  const analyticsEnabled = useFeature('enableAnalytics');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determina la pestaña activa basada en la URL o usa "overview" por defecto
  const getDefaultTab = () => {
    const path = location.pathname.split('/').pop();
    if (path && ['users', 'courses', 'revenue', 'overview'].includes(path)) {
      return path;
    }
    return 'overview';
  };
  
  const [activeTab, setActiveTab] = useState(getDefaultTab());
  
  // Actualiza la URL cuando cambia la pestaña
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/admin/analytics/${tab}`);
  };
  
  useEffect(() => {
    // Actualiza la pestaña activa si la URL cambia (por ejemplo, a través de navegación)
    setActiveTab(getDefaultTab());
  }, [location]);
  
  if (!analyticsEnabled) {
    return (
      <AdminPageLayout
        title="Análisis y Estadísticas"
        subtitle="Esta funcionalidad no está habilitada"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Funcionalidad no habilitada
            </CardTitle>
            <CardDescription>
              Las analíticas están desactivadas en la configuración de características.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Para habilitar esta funcionalidad, ve a Configuración &gt; Características y activa "Analíticas".
            </p>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }
  
  return (
    <AdminPageLayout
      title="Análisis y Estadísticas"
      subtitle="Métricas y estadísticas detalladas de la plataforma"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Visión General</span>
            <span className="sm:hidden">General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Cursos</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Ingresos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <PlatformOverviewSection />
        </TabsContent>
        
        <TabsContent value="users">
          <UserAnalyticsSection />
        </TabsContent>
        
        <TabsContent value="courses">
          <CoursesAnalyticsSection />
        </TabsContent>
        
        <TabsContent value="revenue">
          <RevenueAnalyticsSection />
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default AnalyticsOverview;
