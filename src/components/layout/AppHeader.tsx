
import React from 'react';
import { UserRoleType } from '@/types/auth';
import HeaderContent from './HeaderContent';

interface AppHeaderProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ viewAsRole, onRoleChange }) => {
  return (
    <HeaderContent onRoleChange={onRoleChange} />
  );
};

export default AppHeader;
