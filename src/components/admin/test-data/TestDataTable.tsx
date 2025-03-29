
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { dataTypeLabels } from './DataTypeSelector';
import { DataTypeTabContent } from './DataTypeTabContent';

export const TestDataTable: React.FC = () => {
  const { testData } = useTestData();
  const [activeTab, setActiveTab] = useState<TestDataType>('course');

  return (
    <Tabs 
      defaultValue="course" 
      value={activeTab} 
      onValueChange={(value) => setActiveTab(value as TestDataType)}
    >
      <TabsList className="grid grid-cols-4">
        {Object.entries(dataTypeLabels).map(([type, label]) => (
          <TabsTrigger key={type} value={type}>
            {label} ({testData[type as TestDataType].length})
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(dataTypeLabels).map(([type, label]) => (
        <TabsContent key={type} value={type}>
          <DataTypeTabContent 
            type={type as TestDataType} 
            label={label} 
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
