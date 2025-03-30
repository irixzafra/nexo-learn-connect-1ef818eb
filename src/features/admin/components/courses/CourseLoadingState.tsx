
import React from 'react';

const CourseLoadingState: React.FC = () => {
  return (
    <div className="container mx-auto p-6 flex justify-center items-center h-[70vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );
};

export default CourseLoadingState;
