
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { dataTypeLabels, dataTypeGroups, groupLabels, typeIcons } from './utils/dataTypeUtils';
import { DataTypeTabContent } from './DataTypeTabContent';
import { Database, Info, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Datos generados</h3>
          {hasAnyData && (
            <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-100">
              {totalItems} elementos
            </Badge>
          )}
        </div>
      </div>
      
      <Alert variant="info" className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
        <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
          Los datos generados se almacenan únicamente en memoria y se perderán al recargar la página. No se escriben en la base de datos real.
        </AlertDescription>
      </Alert>
      
      {!hasAnyData ? (
        <div className="bg-muted/20 border rounded-lg p-6 text-center flex flex-col items-center gap-3">
          <Info className="h-10 w-10 text-muted-foreground/50" />
          <div>
            <p className="text-muted-foreground font-medium mb-1">No hay datos generados</p>
            <p className="text-sm text-muted-foreground/70">
              Utiliza el generador para crear datos de prueba para la aplicación
            </p>
          </div>
        </div>
      ) : (
        <Tabs 
          defaultValue="course" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as TestDataType)}
          className="mt-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
            {Object.entries(dataTypeGroups).map(([groupKey, types]) => {
              // Only show groups that have data
              if (!groupHasData[groupKey]) return null;
              
              return types.map(type => {
                const count = testData[type].length;
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
              });
            })}
          </div>

          <AnimatePresence mode="wait">
            {Object.entries(dataTypeLabels).map(([type, label]) => (
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
            ))}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};
