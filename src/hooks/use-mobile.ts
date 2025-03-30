
import { useState, useEffect } from "react";

export const useIsMobile = () => {
  // Initialize with a safe server-side value and check the window size once mounted
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if window width is less than the mobile breakpoint
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Set the initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};
