
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFinanceAnalytics } from '@/features/admin/hooks/useFinanceAnalytics';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CreditCard, TrendingUp, PieChart as PieChartIcon, BarChart3, Users } from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date for chart
  const formatChartDate = (timestamp: string) => {
    return format(new Date(timestamp), 'dd MMM', { locale: es });
  };

  // Format the revenue by day data for the chart
  const chartData = revenueByDay.map(item => ({
    name: formatChartDate(item.day),
    revenue: item.total_revenue,
    transactions: item.transaction_count
  }));

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(paymentStats.total_revenue)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(paymentStats.revenue_last_30_days)} en los últimos 30 días
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentStats.total_transactions}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {paymentStats.successful_transactions} exitosas, {paymentStats.failed_transactions} fallidas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscriptionStats.active_subscriptions}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {subscriptionStats.trial_subscriptions} en período de prueba
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Recurrentes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(subscriptionStats.monthly_recurring_revenue)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(subscriptionStats.yearly_recurring_revenue)} anual
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Tabs */}
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Ingresos por Período</TabsTrigger>
              <TabsTrigger value="courses">Ingresos por Curso</TabsTrigger>
              <TabsTrigger value="subscriptions">Distribución Suscripciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de Ingresos</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        name="Ingresos"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="transactions"
                        stroke="#82ca9d"
                        name="Transacciones"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Ingresos por Curso</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueByCourse}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="course_title" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="total_revenue" name="Ingresos Totales" fill="#8884d8" />
                      <Bar dataKey="transaction_count" name="Número de Ventas" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscriptions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Suscripciones por Plan</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subscriptionsByPlan}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="subscriber_count"
                        nameKey="plan_name"
                        label={(entry) => entry.plan_name}
                      >
                        {subscriptionsByPlan.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => {
                          if (name === "subscriber_count") {
                            return [value, "Suscriptores"];
                          }
                          return [formatCurrency(Number(value)), "Ingresos"];
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Total de Transacciones</span>
                    <span>{paymentStats.total_transactions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Transacciones Exitosas</span>
                    <span>{paymentStats.successful_transactions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Transacciones Fallidas</span>
                    <span>{paymentStats.failed_transactions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Tasa de Éxito</span>
                    <span>
                      {paymentStats.total_transactions > 0
                        ? ((paymentStats.successful_transactions / paymentStats.total_transactions) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Ingresos Últimos 30 días</span>
                    <span>{formatCurrency(paymentStats.revenue_last_30_days)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium">Promedio por Transacción</span>
                    <span>
                      {paymentStats.total_transactions > 0
                        ? formatCurrency(paymentStats.total_revenue / paymentStats.total_transactions)
                        : formatCurrency(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Suscripciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Total de Suscripciones</span>
                    <span>{subscriptionStats.total_subscriptions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Suscripciones Activas</span>
                    <span>{subscriptionStats.active_subscriptions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Suscripciones Canceladas</span>
                    <span>{subscriptionStats.canceled_subscriptions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Períodos de Prueba</span>
                    <span>{subscriptionStats.trial_subscriptions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm font-medium">Ingresos Recurrentes Mensuales</span>
                    <span>{formatCurrency(subscriptionStats.monthly_recurring_revenue)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium">Ingresos Recurrentes Anuales</span>
                    <span>{formatCurrency(subscriptionStats.yearly_recurring_revenue)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
