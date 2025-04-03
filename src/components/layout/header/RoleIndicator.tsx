
import React from 'react';
import EnhancedRoleSimulator from './role-simulator/EnhancedRoleSimulator';

interface RoleIndicatorProps {
  className?: string;
  asToggler?: boolean;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className, asToggler }) => {
  return (
    <div className="relative group">
      <EnhancedRoleSimulator />
      <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </div>
  );
};

export default RoleIndicator;
