
export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor_id: string;
  is_published: boolean;
  price: number;
  currency?: 'eur' | 'usd';
  created_at: string;
  updated_at: string;
  cover_image_url?: string;
  category?: string;
  level?: string;
  duration_text?: string;
  student_count?: number;
  rating?: number;
  original_price?: number;
  discount_percentage?: number;
  featured_instructor?: string;
  grants_certificate?: boolean;
  is_featured_on_landing?: boolean;
  seo_title?: string;
  seo_description?: string;
  slug?: string;
  tags?: string[];
  badge?: string;
  display_order?: number;
  prerequisites_text?: string;
  // Relationships
  instructor?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  modules?: Module[];
  start_date?: string;
}

export interface Module {
  id: string;
  title: string;
  course_id: string;
  module_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  module_id: string;
  course_id: string;
  lesson_order: number;
  content_type: 'text' | 'video' | 'quiz';
  content_text?: any;
  content_video_url?: string;
  is_previewable: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseWithModules extends Course {
  modules: Module[];
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface CourseWithModulesAndLessons extends Course {
  modules: ModuleWithLessons[];
}

export interface EnrollmentStatus {
  isEnrolled: boolean;
  enrollmentDate?: string;
  progress?: number;
  status?: 'in_progress' | 'completed';
}

export interface CourseProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lastViewedAt?: string;
  startedAt?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  slug: string;
  created_by: string;
  is_featured: boolean;
  estimated_hours: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  courses?: Course[];
}
