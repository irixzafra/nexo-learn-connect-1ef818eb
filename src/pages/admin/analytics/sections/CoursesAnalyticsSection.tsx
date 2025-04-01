
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoursesStatistics } from '@/features/courses/hooks/useCoursesStatistics';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download, Filter, RefreshCw, Clock, BookOpen, Users, Star } from 'lucide-react';

const CoursesAnalyticsSection: React.FC = () => {
  const { courseStats, enrollmentTrends, isLoading, refetchAll } = useCoursesStatistics();
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = () => {
    refetchAll();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Datos de métricas clave
  const metricsCards = [
    {
      title: "Total Cursos",
      value: courseStats.totalCourses,
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      title: "Cursos Activos",
      value: courseStats.activeCourses,
      icon: <Star className="h-5 w-5" />,
      color: "bg-green-500/10",
      textColor: "text-green-500"
    },
    {
      title: "Inscripciones Totales",
      value: courseStats.totalEnrollments,
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500/10",
      textColor: "text-blue-500"
    },
    {
      title: "Duración Promedio",
      value: `${courseStats.avgDurationHours}h`,
      icon: <Clock className="h-5 w-5" />,
      color: "bg-amber-500/10",
      textColor: "text-amber-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analíticas de Cursos</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Métricas clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((card, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`${card.color} p-2 rounded-full`}>
                  <div className={card.textColor}>{card.icon}</div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                <div className="text-2xl font-bold mt-1">{card.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfica de tendencias de inscripción */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencias de Inscripción</CardTitle>
          <CardDescription>Número de inscripciones en los últimos 30 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={enrollmentTrends}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Inscripciones" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Cursos */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos más Populares</CardTitle>
          <CardDescription>Los cursos con mayor número de inscripciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseStats.topCourses.map((course, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.categoryName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold">{course.enrollments}</span>
                  <p className="text-sm text-muted-foreground">inscripciones</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesAnalyticsSection;
