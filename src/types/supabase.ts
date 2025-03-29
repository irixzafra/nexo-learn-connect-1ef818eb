
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'student' | 'instructor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          instructor_id: string
          title: string
          description: string | null
          price: number
          currency: 'eur' | 'usd'
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          instructor_id: string
          title: string
          description?: string | null
          price?: number
          currency?: 'eur' | 'usd'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          instructor_id?: string
          title?: string
          description?: string | null
          price?: number
          currency?: 'eur' | 'usd'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          module_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          module_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          module_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          course_id: string
          title: string
          content_type: 'text' | 'video'
          content_text: Json | null
          content_video_url: string | null
          lesson_order: number
          is_previewable: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          course_id: string
          title: string
          content_type?: 'text' | 'video'
          content_text?: Json | null
          content_video_url?: string | null
          lesson_order?: number
          is_previewable?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          course_id?: string
          title?: string
          content_type?: 'text' | 'video'
          content_text?: Json | null
          content_video_url?: string | null
          lesson_order?: number
          is_previewable?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrolled_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrolled_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrolled_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          course_id: string | null
          stripe_charge_id: string | null
          stripe_checkout_session_id: string | null
          amount: number
          currency: 'eur' | 'usd'
          status: 'pending' | 'succeeded' | 'failed'
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id?: string | null
          stripe_charge_id?: string | null
          stripe_checkout_session_id?: string | null
          amount: number
          currency: 'eur' | 'usd'
          status?: 'pending' | 'succeeded' | 'failed'
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string | null
          stripe_charge_id?: string | null
          stripe_checkout_session_id?: string | null
          amount?: number
          currency?: 'eur' | 'usd'
          status?: 'pending' | 'succeeded' | 'failed'
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      user_role: 'student' | 'instructor' | 'admin'
      lesson_content_type: 'text' | 'video'
      payment_status: 'pending' | 'succeeded' | 'failed'
      currency_code: 'eur' | 'usd'
    }
  }
}
