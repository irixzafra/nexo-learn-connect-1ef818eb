
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

const ConditionalHeader: React.FC = () => {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();
  
  // Admin routes don't need an additional header as they already have 
  // a specialized navigation system
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <header className="border-b border-border bg-background px-4 py-3 flex items-center">
      <Button 
        variant="ghost" 
        className="md:hidden mr-2" 
        onClick={toggleSidebar}
      >
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <div className="flex-1">
        {/* Page-specific header content can be added here */}
      </div>
    </header>
  );
};

export default ConditionalHeader;
