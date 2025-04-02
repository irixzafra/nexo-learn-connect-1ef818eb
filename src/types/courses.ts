
export interface Course {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  instructor_id: string;
  category_id: string;
  price?: number;
  enrolled_count?: number;
  rating?: number;
  instructor?: Instructor;
  category?: Category;
  modules?: Module[];
  tags?: string[];
  progress?: number;
  learning_objectives?: string[];
  duration_text?: string;
  currency?: 'eur' | 'usd';
  grants_certificate?: boolean;
  level?: string;
  student_count?: number;
  original_price?: number;
  cover_image_url?: string;
  prerequisites_text?: string;
  badge?: string;
  discount_percentage?: number;
  featured_instructor?: string;
  slug?: string;
  is_published?: boolean;
  is_featured_on_landing?: boolean;
  display_order?: number;
  seo_title?: string;
  seo_description?: string;
  start_date?: string;
  end_date?: string;
  popular_score?: number;
}

export interface Instructor {
  id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  title?: string;
  email?: string;
  role?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  course_id: string;
  lessons?: Lesson[];
  count?: number;
  module_order?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content_type: 'video' | 'text' | 'quiz' | 'assignment';
  content_url?: string;
  module_id: string;
  order: number;
  is_free?: boolean;
  completed?: boolean;
  duration?: number;
  is_previewable?: boolean;
  lesson_order?: number;
  content_text?: any;
  content_video_url?: string;
  course_id?: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed?: boolean;
  progress?: number;
  course?: Course;
}
