
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CommonNavigation from './sidebar/CommonNavigation';
import AdminNavigation from './sidebar/AdminNavigation';
import InstructorNavigation from './sidebar/InstructorNavigation';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {/* Common navigation links for all users */}
      <CommonNavigation />
      
      {/* Admin-specific links */}
      {userRole === 'admin' && <AdminNavigation />}
      
      {/* Instructor-specific links */}
      {userRole === 'instructor' && <InstructorNavigation />}
    </div>
  );
};
