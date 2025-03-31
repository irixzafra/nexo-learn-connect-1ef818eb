
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTagProps {
  name: string;
  className?: string;
}

const SectionTag: React.FC<SectionTagProps> = ({ name, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage for the setting
    const showSectionTags = localStorage.getItem('showSectionTags') === 'true';
    setIsVisible(showSectionTags);

    // Listen for changes to the setting
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'showSectionTags') {
        setIsVisible(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for immediate updates within the same window
    const handleCustomEvent = (e: CustomEvent) => {
      setIsVisible(e.detail.showSectionTags);
    };
    
    window.addEventListener('sectionTagsChanged', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sectionTagsChanged', handleCustomEvent as EventListener);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "absolute top-0 left-0 z-50 bg-blue-600 text-white text-xs px-2 py-1 rounded-br flex items-center",
      className
    )}>
      <Info className="h-3 w-3 mr-1" />
      <span>{name}</span>
    </div>
  );
};

export default SectionTag;
