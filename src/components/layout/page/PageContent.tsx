
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  animated = true,
}) => {
  if (!animated) {
    return (
      <div className={cn("py-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("py-4", className)}
    >
      {children}
    </motion.div>
  );
};

export default PageContent;
