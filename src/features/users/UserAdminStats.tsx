
import React from 'react';
import { UserCheck, UserPlus, UserMinus, Users, Activity } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import PageStats, { StatItem } from '@/components/layout/page/PageStats';

interface UserAdminStatsProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  loading?: boolean;
}

export const UserAdminStats: React.FC<UserAdminStatsProps> = ({
  totalUsers,
  activeUsers,
  newUsers,
  inactiveUsers,
  loading = false
}) => {
  const stats: StatItem[] = [
    {
      label: "Total Usuarios",
      value: loading ? "-" : totalUsers.toString(),
      descriptor: "Usuarios registrados en la plataforma",
      icon: <Users className="h-4 w-4" />,
      color: "primary",
      loading,
      change: {
        value: 4,
        type: 'increase'
      }
    },
    {
      label: "Usuarios Activos",
      value: loading ? "-" : activeUsers.toString(),
      descriptor: "Activos en los últimos 30 días",
      icon: <UserCheck className="h-4 w-4" />,
      color: "success",
      loading,
      change: {
        value: 12,
        type: 'increase'
      }
    },
    {
      label: "Nuevos Usuarios",
      value: loading ? "-" : newUsers.toString(),
      descriptor: "Registrados en los últimos 7 días",
      icon: <UserPlus className="h-4 w-4" />,
      color: "primary",
      loading,
      change: {
        value: 3,
        type: newUsers > 5 ? 'increase' : 'decrease'
      }
    },
    {
      label: "Usuarios Inactivos",
      value: loading ? "-" : inactiveUsers.toString(),
      descriptor: "Sin actividad por más de 90 días",
      icon: <UserMinus className="h-4 w-4" />,
      color: "warning",
      loading,
      change: {
        value: 2,
        type: inactiveUsers > totalUsers * 0.1 ? 'increase' : 'decrease'
      }
    }
  ];

  return <PageStats stats={stats} />;
};
