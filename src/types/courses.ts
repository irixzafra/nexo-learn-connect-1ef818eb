
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
}

export interface Instructor {
  id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  title?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  course_id: string;
  lessons?: Lesson[];
  count?: number;
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
