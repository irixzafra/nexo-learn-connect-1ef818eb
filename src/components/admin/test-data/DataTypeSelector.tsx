
import React, { useState, useEffect } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { DataTypeGroup } from './components/DataTypeGroup';
import { DataCountInput } from './components/DataCountInput';
import { DependencyAlert } from './components/DependencyAlert';
import { dataTypeGroups, dataTypeDependencies } from './utils/dataTypeUtils';

export const DataTypeSelector: React.FC = () => {
  const { generateTestData, isGenerating, testData } = useTestData();
  const [selectedTypes, setSelectedTypes] = useState<TestDataType[]>(['course']);
  const [count, setCount] = useState(1);
  const [showDependencyAlert, setShowDependencyAlert] = useState(false);
  const [missingDependencies, setMissingDependencies] = useState<{type: TestDataType, dependencies: TestDataType[]}[]>([]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 1 : Math.max(1, Math.min(100, value)));
  };

  const handleTypeToggle = (type: TestDataType) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        // Remove if already selected
        const newTypes = prev.filter(t => t !== type);
        // Ensure at least one type is selected
        return newTypes.length > 0 ? newTypes : prev;
      } else {
        // Add if not selected
        return [...prev, type];
      }
    });
  };

  // Check dependencies before generation
  const checkDependencies = (): boolean => {
    const missing: {type: TestDataType, dependencies: TestDataType[]}[] = [];
    
    selectedTypes.forEach(type => {
      const deps = dataTypeDependencies[type];
      if (deps) {
        const missingDeps = deps.filter(dep => 
          testData[dep].length === 0 && !selectedTypes.includes(dep)
        );
        
        if (missingDeps.length > 0) {
          missing.push({
            type,
            dependencies: missingDeps
          });
        }
      }
    });
    
    if (missing.length > 0) {
      setMissingDependencies(missing);
      setShowDependencyAlert(true);
      return false;
    }
    
    return true;
  };

  const handleGenerate = async () => {
    if (!checkDependencies()) {
      return;
    }
    
    // Generate data for each selected type
    for (const type of selectedTypes) {
      await generateTestData(type, count);
    }
  };

  const handleGenerateWithDependencies = async () => {
    // Generate dependencies first
    const allTypesToGenerate = new Set<TestDataType>(selectedTypes);
    
    missingDependencies.forEach(item => {
      item.dependencies.forEach(dep => {
        allTypesToGenerate.add(dep);
      });
    });
    
    // Generate in order (dependencies first)
    const generateOrder: TestDataType[] = [];
    
    // First add types without dependencies
    Array.from(allTypesToGenerate).forEach(type => {
      if (!dataTypeDependencies[type] || dataTypeDependencies[type]?.length === 0) {
        generateOrder.push(type);
      }
    });
    
    // Then add types with dependencies
    Array.from(allTypesToGenerate).forEach(type => {
      if (dataTypeDependencies[type] && dataTypeDependencies[type]?.length > 0) {
        if (!generateOrder.includes(type)) {
          generateOrder.push(type);
        }
      }
    });
    
    // Generate data in the correct order
    for (const type of generateOrder) {
      await generateTestData(type, count);
    }
    
    setShowDependencyAlert(false);
    toast.success("Datos generados exitosamente con sus dependencias");
  };

  useEffect(() => {
    // Reset dependency alert when selection changes
    if (showDependencyAlert) {
      setShowDependencyAlert(false);
    }
  }, [selectedTypes]);

  return (
    <div className="space-y-4">
      <div className="bg-purple-50/50 dark:bg-slate-800/30 rounded-lg p-4 border border-purple-100 dark:border-slate-700">
        <h3 className="font-medium mb-3 text-purple-600 dark:text-purple-400">Generar nuevos datos</h3>
        
        <div>
          <Label htmlFor="data-type" className="text-sm font-medium mb-1.5 block">Tipo de datos</Label>
          <div className="space-y-3">
            {Object.entries(dataTypeGroups).map(([groupKey, types]) => (
              <DataTypeGroup
                key={groupKey}
                groupKey={groupKey}
                types={types}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
              />
            ))}
          </div>
        </div>

        <DataCountInput
          count={count}
          onCountChange={handleCountChange}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          selectedTypes={selectedTypes}
        />
      </div>

      {showDependencyAlert && (
        <DependencyAlert
          missingDependencies={missingDependencies}
          onCancel={() => setShowDependencyAlert(false)}
          onGenerateWithDependencies={handleGenerateWithDependencies}
        />
      )}
    </div>
  );
};
