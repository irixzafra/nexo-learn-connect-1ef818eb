
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CreditCard, GraduationCap, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {trend && (
        <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}%
        </div>
      )}
    </CardContent>
  </Card>
);

interface UserStatsCardProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
}

export const UserStatsCard: React.FC<UserStatsCardProps> = ({
  totalUsers,
  activeUsers,
  newUsers,
  inactiveUsers
}) => {
  const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Usuarios"
        value={totalUsers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Usuarios Activos"
        value={activeUsers}
        description={`${activePercentage}% del total`}
        icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Nuevos Usuarios"
        value={newUsers}
        description="En los últimos 7 días"
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Usuarios Inactivos"
        value={inactiveUsers}
        description="Sin actividad en 30 días"
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};
