
import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

interface GuestLayoutProps {
  children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default GuestLayout;
