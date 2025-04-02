
export interface Module {
  id: string;
  course_id: string;
  title: string;
  module_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
  count?: number; // Adding missing property
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
  duration?: number; // Adding missing property
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
  original_price?: number;
  // New properties for enhanced filter functionality
  start_date?: string;
  end_date?: string; 
  student_count?: number;
  rating?: number;
  tags?: string[];
  popular_score?: number;
  // Progress property for student tracking
  progress?: number;
  // Learning objectives
  learning_objectives?: string[];
  // Nuevos campos añadidos
  badge?: string;
  discount_percentage?: number;
  // Add the grants_certificate property
  grants_certificate?: boolean;
  // Relationships
  instructor?: {
    id: string;
    full_name: string;
    avatar_url?: string;
    bio?: string;
    title?: string;
  };
  modules?: Module[];
}
