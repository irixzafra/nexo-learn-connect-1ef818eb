
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface AdminTabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AdminNavTabsProps {
  tabs: AdminTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  tabsListClassName?: string;
  tabsContentClassName?: string;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({
  tabs,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  tabsListClassName,
  tabsContentClassName,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || tabs[0]?.value);
  
  const value = controlledValue || uncontrolledValue;
  
  const handleValueChange = (newValue: string) => {
    if (!controlledValue) {
      setUncontrolledValue(newValue);
    }
    
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      value={value}
      onValueChange={handleValueChange}
      className={cn("w-full", className)}
    >
      <div className="border-b">
        <TabsList className={cn("h-10 rounded-none gap-4", tabsListClassName)}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className={cn(
                "data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-3",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <span className="mr-1">{tab.icon}</span>}
                {tab.label}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      <div className={cn("mt-4", tabsContentClassName)}>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="m-0">
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default AdminNavTabs;
