
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'card';
  contentClassName?: string;
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  children,
  className,
  fullWidth = false,
  variant = 'default',
  contentClassName,
}) => {
  if (variant === 'card') {
    return (
      <Card className={cn(className)}>
        {(title || description) && (
          <CardHeader className={title && description ? 'pb-3' : 'pb-1'}>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={cn("pt-4", contentClassName)}>
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <section className={cn("space-y-2", fullWidth ? "w-full" : "", className)}>
      {title && (
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default PageSection;
