
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
import { Database, Info, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const TestDataTable: React.FC = () => {
  const { testData } = useTestData();
  const [activeTab, setActiveTab] = useState<TestDataType>('course');

  // Calculate the total count of all test data items
  const totalItems = Object.values(testData).reduce(
    (acc, items) => acc + items.length, 
    0
  );

  const hasAnyData = totalItems > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Datos generados</h3>
          {hasAnyData && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {totalItems} elementos
            </span>
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
          <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 bg-muted/30 p-1">
            {Object.entries(dataTypeLabels).map(([type, label]) => {
              const count = testData[type as TestDataType].length;
              return (
                <TabsTrigger 
                  key={type} 
                  value={type}
                  className="relative"
                  disabled={count === 0}
                >
                  <span>{label}</span>
                  {count > 0 && (
                    <span className="ml-1.5 text-xs bg-primary text-primary-foreground px-1.5 rounded-full">
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

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
