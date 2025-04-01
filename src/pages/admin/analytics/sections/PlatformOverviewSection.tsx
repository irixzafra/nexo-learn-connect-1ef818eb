
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Define los tipos de los props
interface PlatformOverviewProps {
  stats: any;
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PlatformOverviewSection: React.FC<PlatformOverviewProps> = ({ stats, isLoading }) => {
  // Datos de ejemplo para los gráficos
  const activeUsersData = [
    { name: 'Ene', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 550 },
    { name: 'Abr', users: 700 },
    { name: 'May', users: 900 },
    { name: 'Jun', users: 1100 },
    { name: 'Jul', users: 1300 },
  ];

  const enrollmentsByCategory = [
    { name: 'Tecnología', value: 40 },
    { name: 'Negocios', value: 30 },
    { name: 'Diseño', value: 20 },
    { name: 'Marketing', value: 10 },
  ];

  const revenueData = [
    { name: 'Ene', ingresos: 5000 },
    { name: 'Feb', ingresos: 7800 },
    { name: 'Mar', ingresos: 6000 },
    { name: 'Abr', ingresos: 8900 },
    { name: 'May', ingresos: 7200 },
    { name: 'Jun', ingresos: 9800 },
    { name: 'Jul', ingresos: 12000 },
  ];

  return (
    <div className="space-y-6">
      {/* Gráfico de usuarios activos */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios Activos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activeUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  name="Usuarios Activos"
                  stroke="#8884d8" 
                  fill="#8884d8"
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Gráficos inferiores en una cuadrícula */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribución de inscripciones por categoría */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inscripciones por Categoría</CardTitle>
              <Badge variant="outline">En desarrollo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={enrollmentsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {enrollmentsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Ingresos mensuales */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ingresos Mensuales (€)</CardTitle>
              <Badge variant="outline">En desarrollo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                  <Bar 
                    dataKey="ingresos" 
                    name="Ingresos" 
                    fill="#82ca9d" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformOverviewSection;
