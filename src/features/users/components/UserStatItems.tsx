
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart3, Layers, Users } from "lucide-react";

interface StatItemProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  title,
  value,
  description,
  icon,
  colorClass = "text-muted-foreground"
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between py-4">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={colorClass}>{icon}</div>
    </CardHeader>
    <CardContent className="py-0 pb-4">
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
}

export const UserStats: React.FC<UserStatsProps> = ({
  totalUsers,
  activeUsers,
  newUsers,
  inactiveUsers
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem
        title="Total Usuarios"
        value={totalUsers}
        icon={<Users className="h-4 w-4" />}
        colorClass="text-blue-600"
      />
      <StatItem
        title="Usuarios Activos"
        value={activeUsers}
        description={`${Math.round((activeUsers / totalUsers) * 100)}% del total`}
        icon={<Layers className="h-4 w-4" />}
        colorClass="text-green-600"
      />
      <StatItem
        title="Nuevos Usuarios"
        value={newUsers}
        description="Últimos 7 días"
        icon={<AreaChart className="h-4 w-4" />}
        colorClass="text-yellow-600"
      />
      <StatItem
        title="Usuarios Inactivos"
        value={inactiveUsers}
        description="Sin actividad reciente"
        icon={<BarChart3 className="h-4 w-4" />}
        colorClass="text-orange-600"
      />
    </div>
  );
};
