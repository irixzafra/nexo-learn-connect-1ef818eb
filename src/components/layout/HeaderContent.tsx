
import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserRoleType, toUserRoleType } from '@/types/auth';

interface HeaderContentProps {
  onRoleChange?: (role: UserRoleType) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = () => {
  const location = useLocation();
  
  // Don't show any header on admin pages or community pages
  const isAdminPage = location.pathname.includes('/admin');
  const isCommunityPage = location.pathname.includes('/community');
  
  if (isAdminPage || isCommunityPage) {
    return null;
  }
  
  // Return null to prevent rendering anything in the header
  return null;
};

export default HeaderContent;
