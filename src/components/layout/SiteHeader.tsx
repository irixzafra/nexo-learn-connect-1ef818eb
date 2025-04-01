
import React from 'react';

const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <span className="font-bold">Academia LMS</span>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
