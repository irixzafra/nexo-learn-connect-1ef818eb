
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import AppLayout from './AppLayout';

interface AppLayoutWrapperProps {
  children: ReactNode;
}

const AppLayoutWrapper: React.FC<AppLayoutWrapperProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppLayout>{children}</AppLayout>
    </SidebarProvider>
  );
};

export default AppLayoutWrapper;
