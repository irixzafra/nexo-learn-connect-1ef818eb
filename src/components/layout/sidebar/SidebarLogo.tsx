
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SidebarLogoProps {
  isCollapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ isCollapsed }) => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <motion.span 
              className="text-lg font-bold"
              animate={{ 
                background: [
                  "linear-gradient(90deg, #fff 0%, #f0f0f0 100%)",
                  "linear-gradient(90deg, #f0f0f0 0%, #fff 100%)",
                  "linear-gradient(90deg, #fff 0%, #f0f0f0 100%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              n
            </motion.span>
          </div>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="ml-2"
            >
              <h1 className="text-lg font-bold leading-none">nexo</h1>
              <p className="text-xs text-muted-foreground">ecosistema creativo</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Link>
  );
};

export default SidebarLogo;
