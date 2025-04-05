
import React, { ReactNode } from 'react';
import AppLayout from './AppLayout';

interface AppLayoutWrapperProps {
  children: ReactNode;
}

const AppLayoutWrapper: React.FC<AppLayoutWrapperProps> = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default AppLayoutWrapper;
