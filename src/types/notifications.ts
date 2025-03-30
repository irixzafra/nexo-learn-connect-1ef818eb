
/**
 * Types for the notifications system
 */

export type NotificationType = 
  | 'message'
  | 'course_completed'
  | 'announcement'
  | 'achievement'
  | 'community'
  | 'system'
  | 'info'
  | 'warning'
  | 'error'
  | 'success';

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  user_id: string;
  action_url?: string;
  resource_type?: string;
  resource_id?: string;
  sender_id?: string;
  sender_name?: string;
  sender_avatar?: string;
}
