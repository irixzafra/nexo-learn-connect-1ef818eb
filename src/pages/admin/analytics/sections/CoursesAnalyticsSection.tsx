
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CoursesAnalyticsSection: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Datos de ejemplo
  const courseCompletionData = [
    { name: 'Desarrollo Web', completado: 75, enProgreso: 20, noIniciado: 5 },
    { name: 'Diseño UX/UI', completado: 60, enProgreso: 30, noIniciado: 10 },
    { name: 'Marketing Digital', completado: 85, enProgreso: 10, noIniciado: 5 },
    { name: 'Data Science', completado: 50, enProgreso: 35, noIniciado: 15 },
    { name: 'Cloud Computing', completado: 40, enProgreso: 45, noIniciado: 15 },
  ];

  const courseCategoryData = [
    { name: 'Tecnología', value: 45 },
    { name: 'Diseño', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Negocios', value: 12 },
    { name: 'Otros', value: 8 },
  ];
  
  const completionRateData = [
    { name: 'Semana 1', tasaFinalización: 95 },
    { name: 'Semana 2', tasaFinalización: 85 },
    { name: 'Semana 3', tasaFinalización: 75 },
    { name: 'Semana 4', tasaFinalización: 60 },
    { name: 'Semana 5', tasaFinalización: 45 },
    { name: 'Semana 6', tasaFinalización: 35 },
    { name: 'Semana 7', tasaFinalización: 30 },
    { name: 'Semana 8', tasaFinalización: 25 },
  ];
  
  const topCoursesData = [
    { nombre: 'Desarrollo Web Fullstack', matriculas: 245, valoracion: 4.8 },
    { nombre: 'Diseño UX/UI Avanzado', matriculas: 198, valoracion: 4.7 },
    { nombre: 'Marketing Digital y SEO', matriculas: 187, valoracion: 4.6 },
    { nombre: 'Data Science con Python', matriculas: 165, valoracion: 4.9 },
    { nombre: 'AWS Cloud Practitioner', matriculas: 152, valoracion: 4.5 },
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
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* KPI Card 1 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Tasa de Finalización</p>
              <div className="text-3xl font-bold mt-2">68%</div>
              <div className="mt-2 text-xs text-green-500">↑ 5% vs. mes anterior</div>
              <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* KPI Card 2 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Valoración Promedio</p>
              <div className="text-3xl font-bold mt-2">4.6 / 5</div>
              <div className="mt-2 text-xs text-green-500">↑ 0.2 vs. mes anterior</div>
              <div className="flex mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${star <= 4.6 ? "text-yellow-400" : "text-gray-300"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* KPI Card 3 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Matrículas Nuevas (30d)</p>
              <div className="text-3xl font-bold mt-2">489</div>
              <div className="mt-2 text-xs text-green-500">↑ 12% vs. mes anterior</div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Meta: 500</span>
                <span>97.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de Finalización por Curso */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Estado de Finalización por Curso</CardTitle>
            <CardDescription>
              Distribución de estudiantes por etapa de progreso
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={courseCompletionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completado" name="Completado" stackId="a" fill="#8884d8" />
                  <Bar dataKey="enProgreso" name="En Progreso" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="noIniciado" name="No Iniciado" stackId="a" fill="#ffc658" />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Distribución por Categoría */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
            <CardDescription>
              Porcentaje de cursos por categoría temática
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={courseCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasa de Finalización por Semana */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tasa de Finalización por Semana</CardTitle>
            <CardDescription>
              Porcentaje de estudiantes que completan los módulos semanales
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Finalización']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tasaFinalización" 
                    name="Tasa de Finalización" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Cursos Más Populares */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Cursos Más Populares</CardTitle>
            <CardDescription>
              Los 5 cursos más matriculados y mejor valorados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/30">
                  <tr>
                    <th scope="col" className="px-4 py-3 rounded-l-lg">Curso</th>
                    <th scope="col" className="px-4 py-3">Matrículas</th>
                    <th scope="col" className="px-4 py-3 rounded-r-lg">Valoración</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3"><Skeleton className="h-4 w-full" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                      </tr>
                    ))
                  ) : (
                    topCoursesData.map((curso, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3 font-medium">{curso.nombre}</td>
                        <td className="px-4 py-3">{curso.matriculas}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="mr-2">{curso.valoracion}</span>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer con nota */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Datos presentados con fines ilustrativos. En un entorno de producción, estos datos serían reales.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesAnalyticsSection;
