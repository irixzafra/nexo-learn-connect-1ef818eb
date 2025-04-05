
import React from 'react';
import { UserRoleType } from '@/types/auth';
import HeaderContent from './HeaderContent';

interface AppHeaderProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ viewAsRole, onRoleChange }) => {
  return (
    <div className="border-b bg-background">
      <HeaderContent onRoleChange={onRoleChange} />
    </div>
  );
};

export default AppHeader;
