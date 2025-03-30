
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinanceAnalytics } from '../../hooks/useFinanceAnalytics';
import { 
  BarChart, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar, 
  Line,
  Cell,
  PieChart,
  Pie,
  CartesianGrid
} from 'recharts';
import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState(30);
  const { 
    paymentStats, 
    revenueByDay, 
    revenueByCourse, 
    subscriptionStats, 
    subscriptionsByPlan,
    isLoading 
  } = useFinanceAnalytics(timeRange);

  // Format currency amount
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100) / 100}%`;
  };

  // Prepare data for the chart
  const prepareChartData = (data: any[]) => {
    return data.map(item => ({
      ...item,
      total_revenue: Number(item.total_revenue)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Analíticas Financieras</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === 7 ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange(7)}
          >
            7 días
          </Button>
          <Button 
            variant={timeRange === 30 ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange(30)}
          >
            30 días
          </Button>
          <Button 
            variant={timeRange === 90 ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange(90)}
          >
            90 días
          </Button>
          <Button 
            variant={timeRange === 365 ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange(365)}
          >
            1 año
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Ingresos Totales" 
              value={formatCurrency(paymentStats.total_revenue)}
              description="Desde el comienzo"
            />
            <StatCard 
              title={`Ingresos (${timeRange} días)`} 
              value={formatCurrency(paymentStats.revenue_last_30_days)}
              description={`Últimos ${timeRange} días`}
            />
            <StatCard 
              title="Transacciones" 
              value={paymentStats.total_transactions.toString()}
              description={`${paymentStats.successful_transactions} exitosas, ${paymentStats.failed_transactions} fallidas`}
            />
            <StatCard 
              title="Tasa de Éxito" 
              value={formatPercentage(
                paymentStats.total_transactions > 0 
                  ? (paymentStats.successful_transactions / paymentStats.total_transactions) * 100 
                  : 0
              )}
              description="Transacciones completadas"
            />
          </div>

          {/* Revenue Over Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Ingresos a lo largo del tiempo</CardTitle>
              <CardDescription>
                Evolución de ingresos en los últimos {timeRange} días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={prepareChartData(revenueByDay)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="day" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return format(date, 'dd/MM');
                      }}
                    />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Ingresos']}
                      labelFormatter={(value) => format(new Date(value), 'dd MMMM yyyy', { locale: es })}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total_revenue" 
                      name="Ingresos" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Course and Subscriptions by Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Curso</CardTitle>
                <CardDescription>
                  Distribución de ingresos entre cursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareChartData(revenueByCourse.slice(0, 10))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="course_title" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        tickFormatter={(value) => formatCurrency(value)}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), 'Ingresos']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="total_revenue" 
                        name="Ingresos" 
                        fill="#8884d8" 
                      >
                        {revenueByCourse.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suscripciones</CardTitle>
                <CardDescription>
                  Estadísticas de suscripciones y distribución por plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatCard 
                    small
                    title="Suscripciones Activas" 
                    value={subscriptionStats.active_subscriptions.toString()}
                  />
                  <StatCard 
                    small
                    title="Ingresos Recurrentes" 
                    value={formatCurrency(
                      subscriptionStats.monthly_recurring_revenue + 
                      (subscriptionStats.yearly_recurring_revenue / 12)
                    )}
                    description="MRR"
                  />
                </div>

                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subscriptionsByPlan}
                        dataKey="subscriber_count"
                        nameKey="plan_name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {subscriptionsByPlan.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          value, 
                          `Suscriptores: ${props.payload.plan_name}`
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  description, 
  small = false 
}: { 
  title: string; 
  value: string; 
  description?: string;
  small?: boolean;
}) {
  return (
    <Card>
      <CardContent className={small ? "pt-4" : "pt-6"}>
        <div className="flex flex-col">
          <span className={`text-muted-foreground ${small ? 'text-xs' : 'text-sm'}`}>{title}</span>
          <span className={`font-bold ${small ? 'text-xl' : 'text-2xl'} mt-1`}>{value}</span>
          {description && (
            <span className={`text-muted-foreground ${small ? 'text-xs' : 'text-sm'} mt-1`}>
              {description}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
