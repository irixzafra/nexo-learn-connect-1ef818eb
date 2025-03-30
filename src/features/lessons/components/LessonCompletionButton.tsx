
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLessonCompletion } from '../hooks/useLessonCompletion';
import { LessonProgressControls } from './LessonProgressControls';
import { useAuth } from '@/hooks/useAuth';
import { Lesson } from '@/types/course';

interface LessonCompletionButtonProps {
  lesson: Lesson;
  courseId: string;
}

export const LessonCompletionButton: React.FC<LessonCompletionButtonProps> = ({
  lesson,
  courseId
}) => {
  const { user } = useAuth();
  const { isCompleted, isUpdating, markAsCompleted } = useLessonCompletion(
    lesson.id,
    user?.id,
    courseId
  );

  return (
    <LessonProgressControls
      isCompleted={isCompleted}
      isUpdating={isUpdating}
      onMarkCompleted={markAsCompleted}
    />
  );
};
