
import React from 'react';
import { motion } from 'framer-motion';

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  children, 
  isCollapsed 
}) => {
  return (
    <div className="mb-4">
      {title && !isCollapsed && (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {title}
        </motion.h3>
      )}
      {title && isCollapsed && (
        <div className="mb-1 h-[1px] mx-2 bg-border"></div>
      )}
      {children}
    </div>
  );
};
