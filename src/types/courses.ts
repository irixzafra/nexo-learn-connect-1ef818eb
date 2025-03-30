
import { Course } from './course';

// Re-export Course type from course.ts
export type { Course };

// Extending if needed with additional types specific to courses
export interface CourseWithProgress extends Course {
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  course_id: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  order: number;
  duration?: number;
  module_id: string;
  is_preview?: boolean;
  type?: string;
  video_url?: string;
  completed?: boolean;
}
