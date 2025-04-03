
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Eye, Sliders, Leaf, Braces, BarChart, PieChart, BookOpen } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SidebarGroup } from '../SidebarGroup';
import { useLocalization } from '@/hooks/useLocalization';

interface AccessibilityNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AccessibilityNavigation: React.FC<AccessibilityNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const { t, localizeUrl } = useLocalization();
  const isCollapsed = state === "collapsed";

  // Accessibility routes
  const routes = [
    {
      to: '/app/accessibility',
      icon: Sliders,
      label: t('accessibility.navigation.settings', { default: 'Settings' })
    },
    {
      to: '/app/accessibility/visual',
      icon: Eye,
      label: t('accessibility.navigation.visual', { default: 'Visual' })
    },
    {
      to: '/app/accessibility/keyboard',
      icon: Braces,
      label: t('accessibility.navigation.keyboard', { default: 'Keyboard' })
    },
    {
      to: '/app/accessibility/content',
      icon: BookOpen,
      label: t('accessibility.navigation.content', { default: 'Content' })
    },
    {
      to: '/app/accessibility/performance',
      icon: Leaf,
      label: t('accessibility.navigation.performance', { default: 'Performance' })
    },
    {
      to: '/app/accessibility/analytics',
      icon: BarChart,
      label: t('accessibility.navigation.analytics', { default: 'Analytics' })
    },
    {
      to: '/app/accessibility/roadmap',
      icon: PieChart,
      label: t('accessibility.navigation.roadmap', { default: 'Roadmap' })
    }
  ];

  return (
    <SidebarGroup
      label={t('accessibility.navigation.title', { default: 'Accessibility' })}
      icon={Eye}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        {routes.map((route) => (
          <SidebarMenuItem key={route.to}>
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={localizeUrl(route.to)}
                      className={({ isActive }) => cn(
                        "flex h-9 w-9 items-center justify-center rounded-md",
                        "transition-colors duration-200",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      <span className="sr-only">{route.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">{route.label}</TooltipContent>
              </Tooltip>
            ) : (
              <SidebarMenuButton asChild>
                <NavLink
                  to={localizeUrl(route.to)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-md",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  <span>{route.label}</span>
                </NavLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AccessibilityNavigation;
