
import React from 'react';
import { motion } from 'framer-motion';
import { DataTypeTabContent } from '../DataTypeTabContent';
import { TestDataType } from '@/contexts/test-data';
import { TabsContent } from '@/components/ui/tabs';

interface TestDataContentProps {
  type: TestDataType;
  label: string;
}

export const TestDataContent: React.FC<TestDataContentProps> = ({ 
  type, 
  label 
}) => {
  return (
    <TabsContent key={type} value={type}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <DataTypeTabContent 
          type={type as TestDataType} 
          label={label} 
        />
      </motion.div>
    </TabsContent>
  );
};
