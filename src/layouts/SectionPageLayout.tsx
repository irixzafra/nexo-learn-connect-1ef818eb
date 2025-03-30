
import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionPageLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: {
    title: string;
    description?: string;
    breadcrumbs?: Array<{ title: string; href?: string }>;
  };
  stats?: {
    stats: Array<{
      label: string;
      value: string;
      icon?: React.ReactNode;
      change?: { value: number; positive: boolean };
      loading?: boolean;
      color?: string;
    }>;
  };
  help?: {
    title: string;
    description: string;
    links: Array<{ text: string; href: string }>;
  };
}

const SectionPageLayout: React.FC<SectionPageLayoutProps> = ({ 
  children,
  className,
  header,
  stats,
  help
}) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
};

export default SectionPageLayout;
