
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderContentProps {
  userRole: string | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ userRole }) => {
  return (
    <div className="container mx-auto py-3 px-6 flex justify-between items-center">
      <SidebarTrigger />
      <div className="text-sm text-muted-foreground">
        {userRole && (
          <span className="capitalize">{userRole}</span>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
