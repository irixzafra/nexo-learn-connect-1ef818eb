
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import ProfileDashboard from '@/pages/profile/ProfileDashboard';
import ProfileEdit from '@/pages/profile/ProfileEdit';
import ProfileNotifications from '@/pages/profile/ProfileNotifications';
import ProfileSecurity from '@/pages/profile/ProfileSecurity';
import ProfileSubscriptions from '@/pages/profile/ProfileSubscriptions';
import NotFound from '@/pages/NotFound';

const ProfileRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <ProfileDashboard />
        </AppLayout>
      } />
      <Route path="/edit" element={
        <AppLayout>
          <ProfileEdit />
        </AppLayout>
      } />
      <Route path="/notifications" element={
        <AppLayout>
          <ProfileNotifications />
        </AppLayout>
      } />
      <Route path="/security" element={
        <AppLayout>
          <ProfileSecurity />
        </AppLayout>
      } />
      <Route path="/subscriptions" element={
        <AppLayout>
          <ProfileSubscriptions />
        </AppLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileRoutes;
