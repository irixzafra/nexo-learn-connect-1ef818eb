
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import RouteMetrics from '@/components/analytics/RouteMetrics';

const AdminDashboard: React.FC = () => {
  return (
    <AdminPageLayout
      title="Admin Dashboard"
      subtitle="Overview of system metrics and admin tools"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Overview</CardTitle>
            <CardDescription>System statistics and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Activity className="h-12 w-12 text-primary mb-4" />
              <p className="text-muted-foreground">
                Welcome to the admin dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <RouteMetrics />
      </div>
    </AdminPageLayout>
  );
};

export default AdminDashboard;
