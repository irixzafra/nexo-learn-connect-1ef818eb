
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  change?: { value: number; positive: boolean };
  color?: string;
}

interface StatsSectionProps {
  stats: StatProps[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                {stat.change && (
                  <p className={`text-xs mt-1 ${stat.change.positive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change.positive ? "+" : "-"}{stat.change.value}%
                  </p>
                )}
              </div>
              {stat.icon && (
                <div className={`p-3 rounded-full bg-${stat.color ? stat.color : "primary"}/10`}>
                  {stat.icon}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
