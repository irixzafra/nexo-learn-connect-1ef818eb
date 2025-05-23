
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { dataTypeLabels, dataTypeGroups } from './utils/dataTypeUtils';
import { AnimatePresence, motion } from 'framer-motion';
import { TestDataHeader } from './components/TestDataHeader';
import { EmptyTestDataState } from './components/EmptyTestDataState';
import { TestDataTabsList } from './components/TestDataTabsList';
import { TestDataContent } from './components/TestDataContent';
import { Loader2 } from 'lucide-react';

export const TestDataTable: React.FC = () => {
  const { testData, isLoading } = useTestData();
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Cargando datos de prueba...</p>
      </div>
    );
  }

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
            {Object.entries(dataTypeLabels).map(([type, label]) => {
              const dataType = type as TestDataType;
              // Only render tab content if there's data for this type
              if (testData[dataType].length === 0) return null;
              
              return (
                <TestDataContent 
                  key={type}
                  type={dataType}
                  label={label}
                />
              );
            })}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};
