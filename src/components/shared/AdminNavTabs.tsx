
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

export interface AdminTabItem {
  value: string;
  label: string;
  icon: React.ReactNode; // Required icon property
  content?: React.ReactNode; // Optional content property
  disabled?: boolean;
  dataTag?: string;
}

interface AdminNavTabsProps {
  tabs: AdminTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  children?: React.ReactNode;
  showTabContent?: boolean;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  contentClassName,
  triggerClassName,
  children,
  showTabContent = true
}) => {
  return (
    <Tabs 
      defaultValue={defaultValue || tabs[0]?.value} 
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList className="bg-muted/60 p-1 rounded-lg w-full sm:w-auto flex overflow-auto">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            disabled={tab.disabled}
            data-tag={tab.dataTag || `admin-tab-${tab.value}`}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap",
              "data-[state=active]:bg-background data-[state=active]:shadow-sm",
              "data-[state=active]:text-foreground",
              triggerClassName
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {showTabContent && (
        <>
          {tabs.map((tab) => (
            tab.content && (
              <TabsContent 
                key={tab.value} 
                value={tab.value}
                className={cn("mt-4 rounded-md", contentClassName)}
              >
                {tab.content}
              </TabsContent>
            )
          ))}
          {children}
        </>
      )}
    </Tabs>
  );
};

export default AdminNavTabs;
