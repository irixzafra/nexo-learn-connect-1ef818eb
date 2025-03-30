
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TrendData {
  value: string;
  label: string;
  positive: boolean;
}

export interface DashboardStatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  trend?: TrendData;
  className?: string;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                <span className={trend.positive ? "text-emerald-500" : "text-rose-500"}>
                  {trend.value}
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
