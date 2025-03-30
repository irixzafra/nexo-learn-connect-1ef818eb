
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserActivityData {
  name: string;
  registrations: number;
  logins: number;
  courses: number;
}

interface UserActivityChartProps {
  data: UserActivityData[];
  loading?: boolean;
  className?: string;
}

const UserActivityChart: React.FC<UserActivityChartProps> = ({ 
  data, 
  loading = false,
  className
}) => {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Actividad de Usuarios</CardTitle>
          <CardDescription>Cargando datos de actividad...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Actividad de Usuarios</CardTitle>
        <CardDescription>Registros, inicios de sesión y cursos iniciados</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week">
          <TabsList className="mb-4">
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mes</TabsTrigger>
            <TabsTrigger value="year">Año</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="h-72 mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="registrations" name="Registros" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logins" name="Inicios de sesión" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="courses" name="Cursos iniciados" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="month" className="h-72 mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="registrations" name="Registros" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logins" name="Inicios de sesión" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="courses" name="Cursos iniciados" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="year" className="h-72 mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="registrations" name="Registros" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logins" name="Inicios de sesión" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="courses" name="Cursos iniciados" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserActivityChart;
