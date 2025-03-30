
import React from 'react';
import { TestDataType } from '@/contexts/test-data';
import { TabsTrigger } from '@/components/ui/tabs';
import { typeIcons, dataTypeLabels } from '../utils/dataTypeUtils';
import { Badge } from '@/components/ui/badge';

interface TestDataTypeTabProps {
  type: TestDataType;
  count: number;
}

export const TestDataTypeTab: React.FC<TestDataTypeTabProps> = ({ 
  type, 
  count 
}) => {
  if (count === 0) return null;
  
  return (
    <TabsTrigger 
      key={type} 
      value={type}
      className="relative flex items-center gap-2 px-3 py-2 h-auto"
    >
      <div className="flex items-center gap-2">
        {typeIcons[type]}
        <span className="font-medium">{dataTypeLabels[type]}</span>
      </div>
      <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-600 border-none">
        {count}
      </Badge>
    </TabsTrigger>
  );
};
