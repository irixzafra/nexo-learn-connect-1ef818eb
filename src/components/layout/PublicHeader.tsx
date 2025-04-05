
import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavigation from '@/components/navigation/PublicNavigation';
import { routeMap } from '@/utils/routeUtils';
import Logo from '@/components/Logo';

const PublicHeader: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto">
        <PublicNavigation />
      </div>
    </header>
  );
};

export default PublicHeader;
