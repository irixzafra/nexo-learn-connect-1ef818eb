
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { TestDataType } from '@/contexts/test-data';
import { typeIcons, dataTypeLabels } from '../utils/dataTypeUtils';

interface DataTypeButtonProps {
  type: TestDataType;
  isSelected: boolean;
  onToggle: (type: TestDataType) => void;
}

export const DataTypeButton: React.FC<DataTypeButtonProps> = ({ 
  type, 
  isSelected, 
  onToggle 
}) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "h-12 rounded-lg transition-all",
        isSelected ? 'bg-primary/90' : 'text-muted-foreground bg-transparent'
      )}
      title={dataTypeLabels[type]}
      onClick={() => onToggle(type)}
    >
      <div className="flex flex-col items-center gap-1">
        {typeIcons[type]}
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-1 -right-1 flex items-center justify-center"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground bg-primary rounded-full" />
        </motion.div>
      )}
    </Button>
  );
};
