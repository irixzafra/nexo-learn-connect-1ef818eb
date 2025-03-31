
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface AdminTabItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface AdminTabsProps {
  tabs: AdminTabItem[];
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  iconPosition?: 'left' | 'top';
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className = "",
  orientation = 'horizontal',
  iconPosition = 'left'
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Tabs 
      defaultValue={defaultValue} 
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList 
        className={cn(
          "bg-muted p-1 rounded-lg",
          orientation === 'vertical' ? "flex-col" : "",
          "h-auto"
        )}
      >
        <TooltipProvider delayDuration={300}>
          {tabs.map((tab) => (
            <Tooltip key={tab.value}>
              <TooltipTrigger asChild>
                <TabsTrigger 
                  value={tab.value}
                  className={cn(
                    "flex items-center gap-2",
                    iconPosition === 'top' && "flex-col gap-1.5 py-2.5",
                    isMobile && iconPosition === 'top' && "py-3",
                    "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                    "text-sm font-medium transition-all"
                  )}
                >
                  <span className={cn(
                    "text-muted-foreground data-[state=active]:text-primary transition-colors",
                    iconPosition === 'top' && "text-lg"
                  )}>
                    {tab.icon}
                  </span>
                  
                  {(!isSmallScreen || isMobile) && (
                    <span className={cn(
                      iconPosition === 'top' && "text-xs font-normal"
                    )}>
                      {tab.label}
                    </span>
                  )}
                </TabsTrigger>
              </TooltipTrigger>
              
              {isSmallScreen && !isMobile && (
                <TooltipContent side="bottom" align="center">
                  {tab.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdminTabs;
