
import React from 'react';
import { TestDataType } from '@/contexts/test-data';
import { TestDataTypeTab } from './TestDataTypeTab';
import { dataTypeGroups } from '../utils/dataTypeUtils';
import { TabsList } from '@/components/ui/tabs';

interface TestDataTabsListProps {
  groupHasData: Record<string, boolean>;
  testData: Record<TestDataType, any[]>;
}

export const TestDataTabsList: React.FC<TestDataTabsListProps> = ({
  groupHasData,
  testData
}) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {Object.entries(dataTypeGroups).map(([groupKey, types]) => {
        // Only show groups that have data
        if (!groupHasData[groupKey]) return null;
        
        return types.map(type => {
          const count = testData[type].length;
          if (count === 0) return null;
          
          return (
            <TestDataTypeTab
              key={type}
              type={type}
              count={count}
            />
          );
        });
      })}
    </TabsList>
  );
};
