
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import ModeratorDashboard from '@/pages/moderator/Dashboard';
import ContentReview from '@/pages/moderator/ContentReview';
import CommunityManagement from '@/pages/moderator/CommunityManagement';
import ReportedContent from '@/pages/moderator/ReportedContent';
import UserWarnings from '@/pages/moderator/UserWarnings';
import NotFound from '@/pages/NotFound';

const ModeratorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <ModeratorDashboard />
        </AppLayout>
      } />
      <Route path="/content-review" element={
        <AppLayout>
          <ContentReview />
        </AppLayout>
      } />
      <Route path="/community" element={
        <AppLayout>
          <CommunityManagement />
        </AppLayout>
      } />
      <Route path="/reported-content" element={
        <AppLayout>
          <ReportedContent />
        </AppLayout>
      } />
      <Route path="/user-warnings" element={
        <AppLayout>
          <UserWarnings />
        </AppLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ModeratorRoutes;
