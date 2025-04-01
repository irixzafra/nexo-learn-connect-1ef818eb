
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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RevenueAnalyticsSection: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Datos de ejemplo
  const monthlyRevenueData = [
    { name: 'Ene', ingresos: 12500, objetivo: 10000 },
    { name: 'Feb', ingresos: 13200, objetivo: 12000 },
    { name: 'Mar', ingresos: 14800, objetivo: 13000 },
    { name: 'Abr', ingresos: 15100, objetivo: 14000 },
    { name: 'May', ingresos: 16300, objetivo: 15000 },
    { name: 'Jun', ingresos: 17500, objetivo: 16000 },
    { name: 'Jul', ingresos: 18200, objetivo: 17000 },
    { name: 'Ago', ingresos: 17800, objetivo: 18000 },
    { name: 'Sep', ingresos: 19500, objetivo: 19000 },
    { name: 'Oct', ingresos: 21000, objetivo: 20000 },
    { name: 'Nov', ingresos: 22500, objetivo: 21000 },
    { name: 'Dic', ingresos: 24000, objetivo: 22000 },
  ];

  const revenueSourceData = [
    { name: 'Suscripciones', value: 60 },
    { name: 'Cursos Premium', value: 25 },
    { name: 'Certificaciones', value: 10 },
    { name: 'Otros', value: 5 },
  ];
  
  const conversionData = [
    { name: 'Lun', conversion: 3.2 },
    { name: 'Mar', conversion: 3.5 },
    { name: 'Mié', conversion: 3.8 },
    { name: 'Jue', conversion: 4.2 },
    { name: 'Vie', conversion: 4.5 },
    { name: 'Sáb', conversion: 4.0 },
    { name: 'Dom', conversion: 3.7 },
  ];
  
  const revenuePerProductData = [
    { nombre: 'Plan Premium Anual', ingresos: 56000, unidades: 280 },
    { nombre: 'Plan Premium Mensual', ingresos: 42000, unidades: 3500 },
    { nombre: 'Curso Desarrollo Web', ingresos: 38000, unidades: 950 },
    { nombre: 'Certificación UX/UI', ingresos: 25000, unidades: 500 },
    { nombre: 'Curso Data Science', ingresos: 22000, unidades: 440 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analíticas de Ingresos</h2>
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
              <p className="text-sm text-muted-foreground">Ingresos Mensuales</p>
              <div className="text-3xl font-bold mt-2">€24,000</div>
              <div className="mt-2 text-xs text-green-500">↑ 8% vs. mes anterior</div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Meta: €22,000</span>
                <span>109%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* KPI Card 2 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Valor Promedio</p>
              <div className="text-3xl font-bold mt-2">€85.50</div>
              <div className="mt-2 text-xs text-green-500">↑ 3.2% vs. mes anterior</div>
              <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* KPI Card 3 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
              <div className="text-3xl font-bold mt-2">4.2%</div>
              <div className="mt-2 text-xs text-green-500">↑ 0.5% vs. mes anterior</div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Visitas: 95,238</span>
                <span>Ventas: 4,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingresos Mensuales */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ingresos Mensuales vs. Objetivo</CardTitle>
            <CardDescription>
              Seguimiento de ingresos a lo largo del año
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, value === 'ingresos' ? 'Ingresos' : 'Objetivo']} />
                  <Legend />
                  <Bar dataKey="ingresos" name="Ingresos" fill="#8884d8" />
                  <Line type="monotone" dataKey="objetivo" name="Objetivo" stroke="#ff7300" />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Fuentes de Ingresos */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
            <CardDescription>
              Fuentes de ingresos por tipo de producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={revenueSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueSourceData.map((entry, index) => (
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
        {/* Tasa de Conversión */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tasa de Conversión Diaria</CardTitle>
            <CardDescription>
              Porcentaje de visitantes que realizan una compra
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Conversión']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="conversion" 
                    name="Tasa de Conversión" 
                    stroke="#8884d8" 
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Productos Más Rentables */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Productos Más Rentables</CardTitle>
            <CardDescription>
              Los 5 productos que generan más ingresos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/30">
                  <tr>
                    <th scope="col" className="px-4 py-3 rounded-l-lg">Producto</th>
                    <th scope="col" className="px-4 py-3">Ingresos</th>
                    <th scope="col" className="px-4 py-3 rounded-r-lg">Unidades</th>
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
                    revenuePerProductData.map((producto, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3 font-medium">{producto.nombre}</td>
                        <td className="px-4 py-3">€{producto.ingresos.toLocaleString()}</td>
                        <td className="px-4 py-3">{producto.unidades.toLocaleString()}</td>
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

export default RevenueAnalyticsSection;
