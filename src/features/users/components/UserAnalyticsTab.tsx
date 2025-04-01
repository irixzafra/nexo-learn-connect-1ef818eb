
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStatistics } from '@/features/users/hooks/useUserStatistics';
import { 
  BarChart, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  Users,
  UserPlus,
  User,
  Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6'];

export const UserAnalyticsTab: React.FC = () => {
  const { userCounts, roleDistribution, dailyRegistrations, isLoading, refetchAll } = useUserStatistics();

  // Skip rendering charts if the data is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userCounts.total}</div>
            <p className="text-sm text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <User className="h-4 w-4 mr-2 text-primary" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userCounts.active}</div>
            <p className="text-sm text-muted-foreground mt-1">{Math.round((userCounts.active / userCounts.total) * 100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-primary" />
              New Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userCounts.new}</div>
            <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Role Distribution */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Registrations */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyRegistrations}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8B5CF6"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Tabs - Placeholder for future functionality */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="logins" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="logins" className="text-xs sm:text-sm">Logins</TabsTrigger>
              <TabsTrigger value="pageviews" className="text-xs sm:text-sm">Page Views</TabsTrigger>
              <TabsTrigger value="actions" className="text-xs sm:text-sm">Actions</TabsTrigger>
              <TabsTrigger value="retention" className="text-xs sm:text-sm">Retention</TabsTrigger>
            </TabsList>
            
            <TabsContent value="logins" className="h-64 mt-4">
              <div className="flex items-center justify-center h-full bg-muted/40 rounded-md">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Login Activity</h3>
                  <p className="text-sm text-muted-foreground max-w-md px-4">
                    Detailed login analytics will be available in the next update.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pageviews" className="h-64 mt-4">
              <div className="flex items-center justify-center h-full bg-muted/40 rounded-md">
                <div className="text-center">
                  <LineChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Page Views</h3>
                  <p className="text-sm text-muted-foreground max-w-md px-4">
                    Page view analytics will be available in the next update.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="actions" className="h-64 mt-4">
              <div className="flex items-center justify-center h-full bg-muted/40 rounded-md">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Actions</h3>
                  <p className="text-sm text-muted-foreground max-w-md px-4">
                    User action analytics will be available in the next update.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="retention" className="h-64 mt-4">
              <div className="flex items-center justify-center h-full bg-muted/40 rounded-md">
                <div className="text-center">
                  <PieChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Retention</h3>
                  <p className="text-sm text-muted-foreground max-w-md px-4">
                    Retention analytics will be available in the next update.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
