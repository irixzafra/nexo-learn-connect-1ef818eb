
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { useAdminDashboardStats } from '@/features/admin/hooks/useAdminDashboardStats';
import PlatformOverviewSection from './sections/PlatformOverviewSection';
import UserAnalyticsSection from './sections/UserAnalyticsSection';
import CoursesAnalyticsSection from './sections/CoursesAnalyticsSection';
import RevenueAnalyticsSection from './sections/RevenueAnalyticsSection';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AnalyticsOverview: React.FC = () => {
  const { stats, isLoading } = useAdminDashboardStats();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Determinar qué pestaña mostrar basado en la URL
  React.useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && ['users', 'courses', 'revenue', 'overview'].includes(path)) {
      setActiveTab(path);
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  // Cambiar la URL cuando cambie la pestaña
  const handleTabChange = (tab: string) => {
    navigate(`/admin/analytics/${tab}`);
  };

  // Datos ejemplo para las tarjetas principales
  const overviewCards = [
    {
      title: "Usuarios Activos",
      value: stats.total_users,
      change: "+12%",
      isPositive: true,
      icon: <Users className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Cursos Activos",
      value: stats.active_courses,
      change: "+8%",
      isPositive: true,
      icon: <BookOpen className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Ingresos (Mensual)",
      value: `€${(stats.total_enrollments * 49.99).toFixed(2)}`,
      change: "+15%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Tiempo Promedio",
      value: "42min",
      change: "-5%",
      isPositive: false,
      icon: <Clock className="h-5 w-5" />,
      period: "vs. mes anterior"
    }
  ];
  
  return (
    <AdminPageLayout
      title="Analíticas"
      subtitle="Estadísticas y métricas de rendimiento de la plataforma"
    >
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {card.icon}
                  </div>
                  <div className={`flex items-center ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {card.isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                    <span className="text-sm font-medium">{card.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                  <div className="text-2xl font-bold mt-1">
                    {isLoading ? "..." : card.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{card.period}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navegación entre secciones */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Visión General</span>
                <span className="sm:hidden">General</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
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
          </Tabs>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Este mes</span>
            </Button>
            <Button variant="outline" size="sm">
              <LineChart className="h-4 w-4 mr-2" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>

        {/* Contenido de pestañas */}
        <div className="mt-6">
          {activeTab === 'overview' && <PlatformOverviewSection stats={stats} isLoading={isLoading} />}
          {activeTab === 'users' && <UserAnalyticsSection />}
          {activeTab === 'courses' && <CoursesAnalyticsSection />}
          {activeTab === 'revenue' && <RevenueAnalyticsSection />}
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default AnalyticsOverview;
