
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface AdminTabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content?: ReactNode;
  badge?: number;
}

interface AdminNavTabsProps {
  tabs: AdminTabItem[];
  defaultValue?: string;
  children?: ReactNode;
  // Add support for controlled tabs
  value?: string;
  onValueChange?: (value: string) => void;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({ 
  tabs, 
  defaultValue,
  children,
  value,
  onValueChange
}) => {
  const actualDefaultValue = defaultValue || tabs[0]?.value;
  const isControlled = value !== undefined && onValueChange !== undefined;

  // Props for controlled or uncontrolled behavior
  const tabsProps = isControlled 
    ? { value, onValueChange } 
    : { defaultValue: actualDefaultValue };

  return (
    <Tabs {...tabsProps} className="w-full">
      <TabsList className="mb-6 flex w-full h-auto flex-wrap overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className="flex items-center gap-2 py-2.5 px-3 whitespace-nowrap"
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="pt-2 pb-4">
          {tab.content || children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdminNavTabs;
