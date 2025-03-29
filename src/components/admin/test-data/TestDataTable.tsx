
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

  // Calculate the total count of all test data items
  const totalItems = Object.values(testData).reduce(
    (acc, items) => acc + items.length, 
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Datos generados ({totalItems} elementos en total)
        </h3>
      </div>
      
      <Tabs 
        defaultValue="course" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as TestDataType)}
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
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
    </div>
  );
};
