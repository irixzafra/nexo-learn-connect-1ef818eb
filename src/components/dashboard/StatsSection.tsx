
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface StatAction {
  label: string;
  onClick: () => void;
}

interface StatItem {
  label: string;
  value: string;
  icon: ReactNode;
  action?: StatAction;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
          {stat.action && (
            <div className="mt-3 text-right">
              <Button 
                variant="link" 
                className="h-auto p-0 text-xs" 
                onClick={stat.action.onClick}
              >
                {stat.action.label}
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
