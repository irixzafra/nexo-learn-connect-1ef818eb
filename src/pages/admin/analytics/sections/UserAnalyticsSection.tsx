
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
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
import { Users, UserCheck, UserPlus, Mail, Globe, LineChart as LineChartIcon, Timer } from 'lucide-react';

const UserAnalyticsSection: React.FC = () => {
  // Datos simulados de usuarios
  const userData = {
    totalUsers: 5842,
    activeUsers: 2731,
    newUsersToday: 68,
    retentionRate: 76.4,
    
    // Datos para gráficos
    registrationsByDay: [
      { date: '04/01', count: 42 },
      { date: '04/02', count: 53 },
      { date: '04/03', count: 49 },
      { date: '04/04', count: 62 },
      { date: '04/05', count: 48 },
      { date: '04/06', count: 34 },
      { date: '04/07', count: 45 },
      { date: '04/08', count: 51 },
      { date: '04/09', count: 59 },
      { date: '04/10', count: 64 },
      { date: '04/11', count: 57 },
      { date: '04/12', count: 43 },
      { date: '04/13', count: 39 },
      { date: '04/14', count: 68 },
    ],
    
    userRoles: [
      { name: 'Estudiante', value: 4823 },
      { name: 'Instructor', value: 547 },
      { name: 'Admin', value: 32 },
      { name: 'Gestor', value: 124 },
      { name: 'Invitado', value: 316 }
    ],
    
    usersByCountry: [
      { country: 'España', users: 2345 },
      { country: 'México', users: 1243 },
      { country: 'Colombia', users: 876 },
      { country: 'Argentina', users: 654 },
      { country: 'Chile', users: 432 },
      { country: 'Perú', users: 341 },
      { country: 'Otros', users: 951 }
    ],
    
    retentionByMonth: [
      { month: 'Ene', rate: 72.3 },
      { month: 'Feb', rate: 73.5 },
      { month: 'Mar', rate: 74.1 },
      { month: 'Abr', rate: 75.8 },
      { month: 'May', rate: 76.3 },
      { month: 'Jun', rate: 74.9 },
      { month: 'Jul', rate: 75.2 },
      { month: 'Ago', rate: 75.7 },
      { month: 'Sep', rate: 76.2 },
      { month: 'Oct', rate: 76.4 },
      { month: 'Nov', rate: 75.9 },
      { month: 'Dic', rate: 76.8 }
    ],
    
    sessionDurations: [
      { range: '<5min', percentage: 22 },
      { range: '5-15min', percentage: 31 },
      { range: '15-30min', percentage: 27 },
      { range: '30-60min', percentage: 15 },
      { range: '>60min', percentage: 5 }
    ],
    
    activeTimeOfDay: [
      { hour: '00:00', users: 145 },
      { hour: '03:00', users: 86 },
      { hour: '06:00', users: 124 },
      { hour: '09:00', users: 453 },
      { hour: '12:00', users: 768 },
      { hour: '15:00', users: 842 },
      { hour: '18:00', users: 695 },
      { hour: '21:00', users: 412 }
    ]
  };
  
  // Colores para los gráficos de pastel
  const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE', '#00C49F'];
  
  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                <h3 className="text-2xl font-bold">{userData.totalUsers.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuarios Activos</p>
                <h3 className="text-2xl font-bold">{userData.activeUsers.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nuevos Hoy</p>
                <h3 className="text-2xl font-bold">{userData.newUsersToday}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-full">
                <LineChartIcon className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retención</p>
                <h3 className="text-2xl font-bold">{userData.retentionRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nuevos Registros</CardTitle>
            <CardDescription>Cantidad de nuevos usuarios por día (últimos 14 días)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userData.registrationsByDay}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    name="Nuevos Usuarios"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Rol</CardTitle>
            <CardDescription>Cantidad de usuarios por rol asignado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData.userRoles}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userData.userRoles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Usuarios']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios por País</CardTitle>
            <CardDescription>Distribución geográfica de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userData.usersByCountry}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="country" 
                    type="category" 
                    tick={{ fontSize: 13 }}
                  />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Usuarios']} />
                  <Legend />
                  <Bar 
                    dataKey="users" 
                    fill="#82ca9d" 
                    name="Usuarios"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Retención</CardTitle>
            <CardDescription>Evolución mensual de la retención de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userData.retentionByMonth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 80]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Retención']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                    name="Retención"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Métricas de tiempo y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Duración de Sesiones</CardTitle>
            <CardDescription>Tiempo de permanencia por sesión</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userData.sessionDurations}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Usuarios']} />
                  <Bar 
                    dataKey="percentage" 
                    fill="#FFBB28" 
                    name="Porcentaje de Usuarios"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <Timer className="mr-2 h-4 w-4" />
              Tiempo promedio por sesión: 18 minutos
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actividad por Hora</CardTitle>
            <CardDescription>Usuarios activos según hora del día</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userData.activeTimeOfDay}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Usuarios Activos']} />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="Usuarios Activos"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="mr-2 h-4 w-4" />
              Hora con más actividad: 15:00 - 16:00
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalyticsSection;
