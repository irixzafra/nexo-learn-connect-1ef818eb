
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useRevenueStatistics } from '@/features/finances/hooks/useRevenueStatistics';
import { DollarSign, TrendingUp, CreditCard, Users, PercentIcon } from 'lucide-react';

const RevenueAnalyticsSection: React.FC = () => {
  const { 
    revenueStats, 
    revenueByMonth, 
    revenueByCourse, 
    isLoading 
  } = useRevenueStatistics();
  
  // Colores para el gráfico de categorías
  const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE', '#00C49F'];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                <p className="text-2xl font-bold">€{revenueStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingreso Mensual</p>
                <p className="text-2xl font-bold">€{revenueStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Promedio Cliente</p>
                <p className="text-2xl font-bold">€{revenueStats.averageLifetimeValue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasa de Conversión</p>
                <p className="text-2xl font-bold">{revenueStats.conversionRate}%</p>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <PercentIcon className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico de ingresos mensuales */}
      <Card>
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
          <CardDescription>Evolución en los últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueByMonth}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  angle={-45} 
                  textAnchor="end" 
                  tick={{ fontSize: 12 }}
                  height={60}
                />
                <YAxis 
                  tickFormatter={(value) => `€${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value) => [`€${value.toLocaleString()}`, 'Ingresos']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Ingresos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Cursos más rentables e ingresos por categoría */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cursos Más Rentables</CardTitle>
            <CardDescription>Ingresos totales generados por curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueStats.topCoursesByRevenue}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `€${value.toLocaleString()}`} />
                  <YAxis 
                    dataKey="title" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip 
                    formatter={(value) => [`€${value.toLocaleString()}`, 'Ingresos']}
                  />
                  <Bar dataKey="revenue" fill="#8884d8" name="Ingresos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
            <CardDescription>Por categoría de curso</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByCourse}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByCourse.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Ingresos']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabla de detalles */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Ventas por Curso</CardTitle>
          <CardDescription>Desglose detallado de ingresos y ventas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Curso</th>
                  <th className="px-6 py-3">Categoría</th>
                  <th className="px-6 py-3">Ventas</th>
                  <th className="px-6 py-3">Ingresos</th>
                  <th className="px-6 py-3">Precio</th>
                </tr>
              </thead>
              <tbody>
                {revenueStats.topCoursesByRevenue.map((course, index) => (
                  <tr key={index} className="bg-background border-b hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium">{course.title}</td>
                    <td className="px-6 py-4">{course.category}</td>
                    <td className="px-6 py-4">{course.sales}</td>
                    <td className="px-6 py-4">€{course.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">€{(course.revenue / course.sales).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalyticsSection;
