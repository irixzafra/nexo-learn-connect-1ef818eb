export interface Module {
  id: string;
  course_id: string;
  title: string;
  module_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  content_type: 'text' | 'video';
  content_text?: any;
  content_video_url?: string;
  lesson_order: number;
  is_previewable: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  instructor_id: string;
  title: string;
  description: string;
  price: number;
  currency: 'eur' | 'usd';
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // New SEO and features fields
  cover_image_url?: string;
  slug?: string;
  seo_title?: string;
  seo_description?: string;
  is_featured_on_landing?: boolean;
  duration_text?: string;
  level?: string;
  prerequisites_text?: string;
  display_order?: number;
  // Adding the missing properties
  category?: string;
  featured_instructor?: string;
  // Adding the missing original_price property
  original_price?: number;
  // New properties for enhanced filter functionality
  start_date?: string;
  end_date?: string; 
  student_count?: number;
  rating?: number;
  tags?: string[];
  popular_score?: number;
  // Nuevos campos añadidos
  badge?: string;
  discount_percentage?: number;
  // Relationships
  instructor?: {
    id: string;
    full_name: string;
  };
  modules?: Module[];
}

export interface LearningPath {
  id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  created_by: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  estimated_hours?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
