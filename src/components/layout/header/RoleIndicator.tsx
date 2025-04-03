
import React from 'react';
import EnhancedRoleSimulator from './EnhancedRoleSimulator';

interface RoleIndicatorProps {
  className?: string;
  asToggler?: boolean;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className }) => {
  return <EnhancedRoleSimulator />;
};

export default RoleIndicator;
