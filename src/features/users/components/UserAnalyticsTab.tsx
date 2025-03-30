
import React from 'react';
import { useUserStatistics } from '../hooks/useUserStatistics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, Users, UserPlus, UserCheck, 
  BarChart, PieChart, LineChart, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#EC7063'];
const ROLE_COLORS: Record<string, string> = {
  admin: '#FF8042',
  instructor: '#0088FE',
  student: '#00C49F',
  moderator: '#FFBB28',
  support: '#A569BD',
};

export const UserAnalyticsTab: React.FC = () => {
  const { 
    userCounts, 
    roleDistribution, 
    dailyRegistrations, 
    isLoading,
    refetchAll
  } = useUserStatistics();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  // Prepare data for role distribution pie chart
  const pieData = roleDistribution.map(item => ({
    name: item.role,
    value: Number(item.count)
  }));

  // Fill in missing dates in registration data
  const fillMissingDates = (data: { date: string, count: number }[]) => {
    if (!data.length) return [];
    
    const result = [];
    const start = new Date(data[0].date);
    const end = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let date = new Date(start); date <= end; date = new Date(date.getTime() + dayMs)) {
      const dateStr = date.toISOString().split('T')[0];
      const existingData = data.find(d => d.date === dateStr);
      
      result.push({
        date: dateStr,
        count: existingData ? Number(existingData.count) : 0
      });
    }
    
    return result;
  };

  const filledRegistrationData = fillMissingDates(dailyRegistrations);

  // Get a simplified version of registration data for display
  const simplifiedRegistrationData = filledRegistrationData.map(item => ({
    date: formatDate(item.date),
    Registros: item.count
  }));

  const getRoleDisplayName = (roleCode: string): string => {
    switch (roleCode) {
      case 'admin': return 'Administradores';
      case 'instructor': return 'Instructores';
      case 'student': return 'Estudiantes';
      case 'moderator': return 'Moderadores';
      case 'support': return 'Soporte';
      default: return roleCode;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <h3 className="tracking-tight text-sm font-medium">Total Usuarios</h3>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <div className="text-3xl font-bold mt-2">{userCounts.total}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <h3 className="tracking-tight text-sm font-medium">Usuarios Activos</h3>
              <UserCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <div className="text-3xl font-bold mt-2">{userCounts.active}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <h3 className="tracking-tight text-sm font-medium">Nuevos (7 días)</h3>
              <UserPlus className="h-5 w-5 text-muted-foreground" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <div className="text-3xl font-bold mt-2">{userCounts.new}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <h3 className="tracking-tight text-sm font-medium">% Activos</h3>
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <div className="text-3xl font-bold mt-2">
                {userCounts.total ? Math.round((userCounts.active / userCounts.total) * 100) : 0}%
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="distribution" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="distribution" className="flex gap-2 items-center">
              <PieChart className="h-4 w-4" />
              <span>Distribución</span>
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex gap-2 items-center">
              <LineChart className="h-4 w-4" />
              <span>Registros</span>
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" onClick={refetchAll} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {/* Roles Distribution Chart */}
        <TabsContent value="distribution" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Roles</CardTitle>
              <CardDescription>
                Distribución de usuarios por rol en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                  <Skeleton className="h-72 w-72 rounded-full" />
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Pie Chart */}
                  <div className="w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height={350}>
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={ROLE_COLORS[entry.name] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height={350}>
                      <RechartsBarChart data={pieData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tickFormatter={getRoleDisplayName}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [value, 'Usuarios']}
                          labelFormatter={getRoleDisplayName}
                        />
                        <Bar 
                          dataKey="value" 
                          name="Usuarios" 
                          fill="#8884d8"
                        >
                          {pieData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={ROLE_COLORS[entry.name] || COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registrations Chart */}
        <TabsContent value="registrations" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Registros</CardTitle>
              <CardDescription>
                Nuevos usuarios registrados en los últimos 30 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="w-full h-96 flex items-center justify-center">
                  <Skeleton className="h-72 w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsLineChart data={simplifiedRegistrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Registros" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
