
import React from 'react';
import { NexoLogo } from '@/components/ui/logo';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarLogoSectionProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={cn(
      "flex items-center justify-start",
      isCollapsed ? "px-2 mb-4" : "px-4 mb-6"
    )}>
      {isCollapsed ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="mx-auto"
        >
          <NexoLogo variant="icon" className="h-8 w-auto" />
        </motion.div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
          </motion.div>
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-muted/40 transition-colors text-muted-foreground"
            aria-label="Colapsar menú lateral"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarLogoSection;
