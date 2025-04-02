
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export interface AdminTabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AdminNavTabsProps {
  tabs: AdminTabItem[];
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:max-w-xl">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
            {tab.icon}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdminNavTabs;
