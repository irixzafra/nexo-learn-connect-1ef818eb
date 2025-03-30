
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export interface StatItem {
  label: string;
  value: string | number;
  descriptor?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  loading?: boolean;
}

export interface PageStatsProps {
  stats: StatItem[];
  className?: string;
}

const StatCard: React.FC<StatItem> = ({
  label,
  value,
  descriptor,
  icon,
  change,
  color = 'default',
  loading = false,
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'success':
        return 'bg-green-500/10 text-green-500';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500';
      case 'danger':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted/50 text-foreground';
    }
  };

  const getChangeIndicator = () => {
    if (!change) return null;
    
    const changeColor = 
      change.type === 'increase' 
        ? 'text-green-500' 
        : change.type === 'decrease' 
          ? 'text-red-500' 
          : 'text-muted-foreground';
    
    const changePrefix = change.type === 'increase' ? '+' : '';
    
    return (
      <span className={cn("text-xs flex items-center", changeColor)}>
        {changePrefix}{change.value}%
      </span>
    );
  };

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold">{value}</p>
            {getChangeIndicator()}
          </div>
          {descriptor && (
            <p className="text-xs text-muted-foreground mt-1">{descriptor}</p>
          )}
        </div>
        {icon && (
          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", getColorClass())}>
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PageStats: React.FC<PageStatsProps> = ({ stats, className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default PageStats;
