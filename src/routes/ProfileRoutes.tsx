
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileDashboard from '@/pages/profile/ProfileDashboard';
import ProfileEdit from '@/pages/profile/ProfileEdit';
import ProfileNotifications from '@/pages/profile/ProfileNotifications';
import ProfileSecurity from '@/pages/profile/ProfileSecurity';
import ProfileSubscriptions from '@/pages/profile/ProfileSubscriptions';
import NotFound from '@/pages/NotFound';

const ProfileRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProfileDashboard />} />
      <Route path="edit" element={<ProfileEdit />} />
      <Route path="security" element={<ProfileSecurity />} />
      <Route path="notifications" element={<ProfileNotifications />} />
      <Route path="subscriptions" element={<ProfileSubscriptions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileRoutes;
