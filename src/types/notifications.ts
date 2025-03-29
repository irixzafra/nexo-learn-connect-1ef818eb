
export type NotificationType = 
  | 'message' 
  | 'course_completed' 
  | 'announcement' 
  | 'achievement' 
  | 'system';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  content?: string;
  is_read: boolean;
  created_at: string;
  resource_type?: string;
  resource_id?: string;
  action_url?: string;
}
