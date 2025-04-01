
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, BarChart, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  // Example data for activity chart
  const activityData = [
    { name: 'Mon', users: 120, courses: 15, enrollments: 35 },
    { name: 'Tue', users: 140, courses: 18, enrollments: 42 },
    { name: 'Wed', users: 160, courses: 17, enrollments: 48 },
    { name: 'Thu', users: 180, courses: 19, enrollments: 53 },
    { name: 'Fri', users: 210, courses: 20, enrollments: 60 },
    { name: 'Sat', users: 190, courses: 18, enrollments: 45 },
    { name: 'Sun', users: 150, courses: 15, enrollments: 38 },
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={activityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8B5CF6" name="Users" />
                  <Bar dataKey="courses" fill="#3B82F6" name="Courses" />
                  <Bar dataKey="enrollments" fill="#10B981" name="Enrollments" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Platform Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground mb-2">Total Users</p>
                <p className="text-2xl font-bold">{stats.total_users}</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground mb-2">Total Courses</p>
                <p className="text-2xl font-bold">{stats.total_courses}</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground mb-2">Active Courses</p>
                <p className="text-2xl font-bold">{stats.active_courses}</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground mb-2">Enrollments</p>
                <p className="text-2xl font-bold">{stats.total_enrollments}</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center py-6">
              <div className="flex space-x-8 mb-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-2">
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium">User Growth</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/10 mb-2">
                    <BarChart className="h-8 w-8 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Course Progress</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10 mb-2">
                    <PieChart className="h-8 w-8 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium">Revenue Split</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Detailed analytics reports can be accessed from the specialized sections for Users, Courses, and Revenue.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformOverviewSection;
