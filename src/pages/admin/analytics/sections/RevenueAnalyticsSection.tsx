
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRevenueStatistics } from '@/features/finances/hooks/useRevenueStatistics';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, RefreshCw, DollarSign, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

// Colores para los gráficos
const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F97316', '#EC4899'];

const RevenueAnalyticsSection: React.FC = () => {
  const { revenueStats, revenueByMonth, revenueByCourse, isLoading, refetchAll } = useRevenueStatistics();
  const [period, setPeriod] = useState("6m"); // 1m, 3m, 6m, 1y

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

  // Datos para las tarjetas de KPI
  const kpiCards = [
    {
      title: "Ingresos Totales",
      value: `€${revenueStats.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Valor Medio (LTV)",
      value: `€${revenueStats.averageLifetimeValue.toLocaleString()}`,
      change: "+8.3%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Ingresos Mensuales",
      value: `€${revenueStats.monthlyRevenue.toLocaleString()}`,
      change: "+15.2%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5" />,
      period: "vs. mes anterior"
    },
    {
      title: "Tasa de Conversión",
      value: `${revenueStats.conversionRate.toFixed(1)}%`,
      change: "-2.1%",
      isPositive: false,
      icon: <DollarSign className="h-5 w-5" />,
      period: "vs. mes anterior"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resumen de Ingresos</h2>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, idx) => (
          <Card key={idx} className="shadow-sm">
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
                <div className="text-2xl font-bold mt-1">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue by Month Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Tendencia de Ingresos</CardTitle>
            <CardDescription>Ingresos mensuales durante el último año</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Este año</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueByMonth}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Ingresos" 
                  stroke="#8B5CF6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Course Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos por Categoría de Curso</CardTitle>
            <CardDescription>Distribución de ingresos por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByCourse}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueByCourse.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Courses by Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos con Mayores Ingresos</CardTitle>
            <CardDescription>Los 5 cursos que generan más ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStats.topCoursesByRevenue.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">€{course.revenue.toLocaleString()}</span>
                    <p className="text-sm text-muted-foreground">{course.sales} ventas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalyticsSection;
