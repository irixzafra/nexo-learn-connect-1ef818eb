
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Check if window is available (browser environment)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Initial check
    handleChange();

    // Listen for changes
    if (matchMedia.addListener) {
      // For older browsers
      matchMedia.addListener(handleChange);
    } else {
      // For modern browsers
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        // For older browsers
        matchMedia.removeListener(handleChange);
      } else {
        // For modern browsers
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}
