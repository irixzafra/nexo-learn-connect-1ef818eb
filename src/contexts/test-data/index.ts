
import { createContext, useContext, useState, ReactNode } from 'react';

interface TestDataContextType {
  isTestMode: boolean;
  enableTestMode: () => void;
  disableTestMode: () => void;
  testData: Record<string, any>;
  setTestData: (key: string, value: any) => void;
}

const TestDataContext = createContext<TestDataContextType | undefined>(undefined);

export const useTestData = () => {
  const context = useContext(TestDataContext);
  if (!context) {
    throw new Error('useTestData must be used within a TestDataProvider');
  }
  return context;
};

export const TestDataProvider = ({ children }: { children: ReactNode }) => {
  const [isTestMode, setIsTestMode] = useState(false);
  const [testData, setTestDataState] = useState<Record<string, any>>({});

  const enableTestMode = () => setIsTestMode(true);
  const disableTestMode = () => setIsTestMode(false);
  
  const setTestData = (key: string, value: any) => {
    setTestDataState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <TestDataContext.Provider
      value={{ 
        isTestMode, 
        enableTestMode, 
        disableTestMode, 
        testData, 
        setTestData 
      }}
    >
      {children}
    </TestDataContext.Provider>
  );
};

export * from './TestDataContext';
export * from './TestDataProvider';
export * from './testDataTypes';
export * from './generateTestData';
