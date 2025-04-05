
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModeratorDashboard from '@/pages/moderator/Dashboard';
import ContentReview from '@/pages/moderator/ContentReview';
import CommunityManagement from '@/pages/moderator/CommunityManagement';
import ReportedContent from '@/pages/moderator/ReportedContent';
import UserWarnings from '@/pages/moderator/UserWarnings';
import NotFound from '@/pages/NotFound';

const ModeratorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ModeratorDashboard />} />
      <Route path="/content-review" element={<ContentReview />} />
      <Route path="/community" element={<CommunityManagement />} />
      <Route path="/reported-content" element={<ReportedContent />} />
      <Route path="/user-warnings" element={<UserWarnings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ModeratorRoutes;
