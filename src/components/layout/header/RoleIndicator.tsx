
import React from 'react';
import EnhancedRoleSimulator from './role-simulator/EnhancedRoleSimulator';

interface RoleIndicatorProps {
  className?: string;
  asToggler?: boolean;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className, asToggler }) => {
  return <EnhancedRoleSimulator />;
};

export default RoleIndicator;
