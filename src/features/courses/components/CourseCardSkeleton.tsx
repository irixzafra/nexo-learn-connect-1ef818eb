
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseCardSkeletonProps {
  count?: number;
}

export const CourseCardSkeleton: React.FC<CourseCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
              
              <div className="flex items-center pt-4 space-x-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
