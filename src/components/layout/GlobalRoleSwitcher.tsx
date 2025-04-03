
import React from 'react';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';

interface GlobalRoleSwitcherProps {
  className?: string;
}

const GlobalRoleSwitcher: React.FC<GlobalRoleSwitcherProps> = ({ className }) => {
  return <RoleSwitcher className={className} />;
};

export default GlobalRoleSwitcher;
