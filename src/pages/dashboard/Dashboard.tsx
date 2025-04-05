
import React from 'react';
import AppLayoutWrapper from '@/components/layout/AppLayoutWrapper';

const Dashboard: React.FC = () => {
  return (
    <AppLayoutWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {/* Dashboard content would go here */}
      </div>
    </AppLayoutWrapper>
  );
};

export default Dashboard;
