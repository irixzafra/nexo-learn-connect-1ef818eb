// This file is now deprecated. We are using the shadcn SidebarProvider instead.
// Keeping this file temporarily for backward compatibility until all imports are updated.

import React from 'react';
import { SidebarProvider as ShadcnSidebarProvider } from '@/components/ui/sidebar/sidebar-provider';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ShadcnSidebarProvider>{children}</ShadcnSidebarProvider>;
};

// Re-export the hooks from the proper location
export { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
