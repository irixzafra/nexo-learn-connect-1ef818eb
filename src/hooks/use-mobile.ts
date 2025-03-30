
import { useState, useEffect } from "react";

export const useIsMobile = () => {
  // Initialize with a safe server-side value and check the window size once mounted
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set the initial value once we're in the browser
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
