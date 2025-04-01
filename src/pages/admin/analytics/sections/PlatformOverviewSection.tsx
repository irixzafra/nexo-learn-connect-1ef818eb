
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, BarChart, PieChart, Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// Tipos para las estadísticas de la plataforma
interface PlatformStats {
  total_users: number;
  active_users?: number;
  total_courses: number;
  active_courses: number;
  total_enrollments: number;
  total_revenue?: number;
  recent_signups?: number[];
}

interface PlatformOverviewSectionProps {
  stats: PlatformStats;
  isLoading: boolean;
}

const PlatformOverviewSection: React.FC<PlatformOverviewSectionProps> = ({ stats, isLoading }) => {
  // Datos para la actividad diaria
  const activityData = [
    { name: 'Lun', users: 120, courses: 15, enrollments: 35 },
    { name: 'Mar', users: 140, courses: 18, enrollments: 42 },
    { name: 'Mié', users: 160, courses: 17, enrollments: 48 },
    { name: 'Jue', users: 180, courses: 19, enrollments: 53 },
    { name: 'Vie', users: 210, courses: 20, enrollments: 60 },
    { name: 'Sáb', users: 190, courses: 18, enrollments: 45 },
    { name: 'Dom', users: 150, courses: 15, enrollments: 38 },
  ];

  // Datos para el crecimiento de usuarios
  const userGrowthData = [
    { month: 'Ene', users: 1100 },
    { month: 'Feb', users: 1250 },
    { month: 'Mar', users: 1400 },
    { month: 'Abr', users: 1500 },
    { month: 'May', users: 1650 },
    { month: 'Jun', users: 1800 },
    { month: 'Jul', users: 2000 },
    { month: 'Ago', users: 2150 },
    { month: 'Sep', users: 2300 },
    { month: 'Oct', users: 2450 },
    { month: 'Nov', users: 2600 },
    { month: 'Dic', users: 2800 },
  ];

  // Datos para distribución de categorías
  const categoryData = [
    { name: 'Desarrollo Web', value: 35 },
    { name: 'Diseño', value: 25 },
    { name: 'Marketing', value: 20 },
    { name: 'Ciencia de Datos', value: 15 },
    { name: 'Otros', value: 5 },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                <h3 className="text-2xl font-bold">{stats.total_users.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cursos Activos</p>
                <h3 className="text-2xl font-bold">{stats.active_courses.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inscripciones</p>
                <h3 className="text-2xl font-bold">{stats.total_enrollments.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Est.</p>
                <h3 className="text-2xl font-bold">€{(stats.total_enrollments * 49.99).toLocaleString(undefined, {maximumFractionDigits: 0})}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos más detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tendencias de la última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="Usuarios" />
                  <Bar dataKey="courses" fill="#82ca9d" name="Cursos" />
                  <Bar dataKey="enrollments" fill="#ffc658" name="Inscripciones" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
            <CardDescription>Tendencia anual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userGrowthData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="Usuarios"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección explicativa */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen General</CardTitle>
          <CardDescription>Estado actual de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
            <div className="md:w-1/2 space-y-4">
              <p>
                La plataforma muestra un crecimiento constante en inscripciones y usuarios activos. 
                Las analíticas detalladas por sección te permiten profundizar en aspectos específicos:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span><strong>Usuarios:</strong> Analiza el crecimiento, retención y comportamiento de los usuarios.</span>
                </li>
                
                <li className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <span><strong>Cursos:</strong> Evalúa el rendimiento, popularidad y engagement de los cursos.</span>
                </li>
                
                <li className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                  <span><strong>Ingresos:</strong> Monitoriza los ingresos, conversiones y valores por cliente.</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-2/5">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[
                        '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'
                      ][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Distribución de categorías de cursos populares
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformOverviewSection;
