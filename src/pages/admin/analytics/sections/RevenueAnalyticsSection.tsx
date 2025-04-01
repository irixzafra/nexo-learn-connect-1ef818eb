
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const revenueByMonthData = [
  { month: 'Ene', revenue: 15420 },
  { month: 'Feb', revenue: 18250 },
  { month: 'Mar', revenue: 22130 },
  { month: 'Abr', revenue: 19845 },
  { month: 'May', revenue: 24680 },
  { month: 'Jun', revenue: 28750 },
];

const revenueSourcesData = [
  { name: 'Cursos Individuales', value: 65 },
  { name: 'Suscripciones', value: 25 },
  { name: 'Bundles', value: 10 },
];

const topSellingCourses = [
  { course: 'Máster en React', revenue: 12500 },
  { course: 'UX/UI Completo', revenue: 9800 },
  { course: 'Machine Learning', revenue: 8600 },
  { course: 'Data Science', revenue: 7200 },
  { course: 'Python Avanzado', revenue: 6500 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1'];

const revenueMetrics = [
  { label: 'Revenue Total YTD', value: '€162,075.00', change: '+24%', positive: true },
  { label: 'Ingresos Mensuales', value: '€28,750.00', change: '+17%', positive: true },
  { label: 'Valor Promedio Compra', value: '€89.50', change: '+5%', positive: true },
  { label: 'Tasa de Conversión', value: '4.2%', change: '-0.5%', positive: false },
];

const RevenueAnalyticsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Revenue Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="text-2xl font-bold mt-2">{metric.value}</span>
                <span className={`text-sm mt-1 ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} vs. mes anterior
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Ingresos</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueByMonthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Ingresos']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Ingresos" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Ingresos</CardTitle>
            <CardDescription>Distribución por tipo de venta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos con Mayores Ingresos</CardTitle>
            <CardDescription>Top 5 por ingresos generados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topSellingCourses}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="course" type="category" width={120} />
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Ingresos']} />
                  <Legend />
                  <Bar dataKey="revenue" name="Ingresos" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Future Revenue Projection - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Proyección de Ingresos</CardTitle>
          <CardDescription>Próximos 6 meses basado en tendencias actuales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              Funcionalidad en desarrollo. La proyección de ingresos estará disponible próximamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalyticsSection;
