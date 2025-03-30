
import React from 'react';
import { TestDataType } from '@/contexts/test-data';
import { DataTypeButton } from './DataTypeButton';
import { groupLabels } from '../utils/dataTypeUtils';

interface DataTypeGroupProps {
  groupKey: string;
  types: TestDataType[];
  selectedTypes: TestDataType[];
  onTypeToggle: (type: TestDataType) => void;
}

export const DataTypeGroup: React.FC<DataTypeGroupProps> = ({
  groupKey,
  types,
  selectedTypes,
  onTypeToggle
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-0.5 w-4 bg-muted-foreground/20"></div>
        <span className="text-xs font-medium text-muted-foreground">{groupLabels[groupKey]}</span>
        <div className="h-0.5 flex-1 bg-muted-foreground/20"></div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {types.map(type => (
          <DataTypeButton
            key={type}
            type={type}
            isSelected={selectedTypes.includes(type)}
            onToggle={onTypeToggle}
          />
        ))}
      </div>
    </div>
  );
};
