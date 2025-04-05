
import React from 'react';
import { BreadcrumbTrail } from '@/components/navigation/breadcrumb';

interface BreadcrumbHeaderProps {
  className?: string;
}

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ className }) => {
  return (
    <div className={className}>
      <BreadcrumbTrail />
    </div>
  );
};

export default BreadcrumbHeader;
