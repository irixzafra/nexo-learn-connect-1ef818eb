
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { dataTypeLabels, dataTypeGroups } from './utils/dataTypeUtils';
import { AnimatePresence } from 'framer-motion';
import { TestDataHeader } from './components/TestDataHeader';
import { EmptyTestDataState } from './components/EmptyTestDataState';
import { TestDataTabsList } from './components/TestDataTabsList';
import { TestDataContent } from './components/TestDataContent';

export const TestDataTable: React.FC = () => {
  const { testData } = useTestData();
  const [activeTab, setActiveTab] = useState<TestDataType>('course');

  // Calculate the total count of all test data items
  const totalItems = Object.values(testData).reduce(
    (acc, items) => acc + items.length, 
    0
  );

  // Check if there is data for each group
  const groupHasData = Object.entries(dataTypeGroups).reduce((acc, [group, types]) => {
    acc[group] = types.some(type => testData[type].length > 0);
    return acc;
  }, {} as Record<string, boolean>);

  const hasAnyData = totalItems > 0;

  return (
    <div className="space-y-4">
      <TestDataHeader 
        totalItems={totalItems}
        hasAnyData={hasAnyData} 
      />
      
      {!hasAnyData ? (
        <EmptyTestDataState />
      ) : (
        <Tabs 
          defaultValue="course" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as TestDataType)}
          className="mt-2"
        >
          <TestDataTabsList 
            groupHasData={groupHasData}
            testData={testData}
          />

          <AnimatePresence mode="wait">
            {Object.entries(dataTypeLabels).map(([type, label]) => (
              <TestDataContent 
                key={type}
                type={type as TestDataType}
                label={label}
              />
            ))}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};
