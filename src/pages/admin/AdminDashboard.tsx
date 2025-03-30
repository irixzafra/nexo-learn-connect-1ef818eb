
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Loader2, Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminPageLayout from '@/layouts/AdminPageLayout';

const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_dashboard_stats');
      
      if (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
      }
      
      return data;
    },
  });

  const { data: userRegistrations, isLoading: isLoadingUserRegistrations } = useQuery({
    queryKey: ['userRegistrations'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_registrations_by_day');
      
      if (error) {
        console.error('Error fetching user registrations:', error);
        throw error;
      }
      
      return data.map((item: any) => ({
        date: new Date(item.date).toLocaleDateString(),
        count: item.count,
      }));
    },
  });

  return (
    <AdminPageLayout
      title="Dashboard"
      subtitle="Vista general de la plataforma"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Usuarios</CardDescription>
              <CardTitle className="text-3xl">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats?.total_users.toLocaleString() || '0'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+{stats?.new_users_last_7_days || 0}</span> nuevos en los últimos 7 días
              </div>
              <Users className="h-8 w-8 text-muted-foreground/30 absolute bottom-4 right-4" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cursos Activos</CardDescription>
              <CardTitle className="text-3xl">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats?.active_courses.toLocaleString() || '0'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Cursos publicados y disponibles
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground/30 absolute bottom-4 right-4" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Inscripciones Totales</CardDescription>
              <CardTitle className="text-3xl">
                {isLoadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats?.total_enrollments.toLocaleString() || '0'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Estudiantes inscritos en cursos
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground/30 absolute bottom-4 right-4" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tasa de Crecimiento</CardDescription>
              <CardTitle className="text-3xl">
                {isLoadingStats && isLoadingUserRegistrations ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "12%"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Comparado con el mes anterior
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground/30 absolute bottom-4 right-4" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nuevos usuarios por día</CardTitle>
              <CardDescription>
                Registro de usuarios en los últimos 30 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingUserRegistrations ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userRegistrations || []}
                      margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        angle={-45} 
                        textAnchor="end" 
                        tick={{ fontSize: 10 }}
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" name="Usuarios" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de usuarios por rol</CardTitle>
              <CardDescription>
                Porcentaje de usuarios por tipo de rol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex justify-center items-center">
                <p className="text-center text-muted-foreground">
                  Datos no disponibles. Implementa la función RPC 'get_user_role_distribution' para mostrar este gráfico.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default AdminDashboard;
