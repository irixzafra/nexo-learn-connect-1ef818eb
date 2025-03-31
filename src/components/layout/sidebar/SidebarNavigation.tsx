
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarNavigationProps {
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ items, isCollapsed }) => {
  // Animación para elementos del menú
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex h-10 w-10 items-center justify-center rounded-md 
                    ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}
                  `}
                >
                  <motion.div
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5" />
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <Badge 
                        className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                        variant="destructive"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </motion.div>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}
              `}
            >
              <motion.div
                className="flex w-full items-center"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <Badge className="ml-auto" variant="destructive">
                    {item.badge}
                  </Badge>
                )}
              </motion.div>
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
