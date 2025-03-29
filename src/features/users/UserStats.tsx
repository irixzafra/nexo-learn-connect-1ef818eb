
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserPlus, UserX } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className={`text-xs mt-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </CardContent>
  </Card>
);

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  loading?: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ 
  totalUsers, 
  activeUsers, 
  newUsers, 
  inactiveUsers,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-7 w-16 bg-muted rounded mb-2"></div>
              <div className="h-3 w-32 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Total Usuarios"
        value={totalUsers}
        description="Usuarios registrados en la plataforma"
        icon={<Users className="h-4 w-4 text-primary" />}
        trend={{ value: "4% este mes", isPositive: true }}
      />
      <StatsCard
        title="Usuarios Activos"
        value={activeUsers}
        description="Han iniciado sesión en los últimos 30 días"
        icon={<UserCheck className="h-4 w-4 text-green-500" />}
        trend={{ value: "12% este mes", isPositive: true }}
      />
      <StatsCard
        title="Nuevos Usuarios"
        value={newUsers}
        description="Registrados en los últimos 7 días"
        icon={<UserPlus className="h-4 w-4 text-blue-500" />}
        trend={{ value: "3% este mes", isPositive: false }}
      />
      <StatsCard
        title="Usuarios Inactivos"
        value={inactiveUsers}
        description="Sin iniciar sesión en más de 90 días"
        icon={<UserX className="h-4 w-4 text-amber-500" />}
        trend={{ value: "2% este mes", isPositive: true }}
      />
    </div>
  );
};
