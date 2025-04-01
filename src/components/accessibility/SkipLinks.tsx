
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAccessibility } from '@/hooks/useAccessibility';

interface SkipLinksProps {
  routes?: {
    id: string;
    label: string;
  }[];
}

/**
 * SkipLinks component provides keyboard accessible navigation to jump to
 * important parts of the page without using the mouse.
 * 
 * It's especially helpful for screen reader users and keyboard-only users
 * to bypass repeated navigation sections.
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({ 
  routes = [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'main-navigation', label: 'Skip to main navigation' },
    { id: 'footer', label: 'Skip to footer' }
  ] 
}) => {
  const { isScreenReaderOptimized } = useAccessibility();
  const [showSkipLinks, setShowSkipLinks] = useLocalStorage('show-skip-links', true);
  
  // Don't render if the user has disabled skip links and isn't using a screen reader
  if (!showSkipLinks && !isScreenReaderOptimized) {
    return null;
  }
  
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:right-0 focus-within:z-50 focus-within:bg-background focus-within:p-4 focus-within:shadow-md">
      <nav aria-label="Skip links" className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {routes.map((route) => (
          <a
            key={route.id}
            href={`#${route.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {route.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SkipLinks;
