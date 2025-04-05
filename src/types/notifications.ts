
export type NotificationType = 
  | 'message' 
  | 'course_completed' 
  | 'announcement' 
  | 'achievement' 
  | 'system'
  | 'community';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content?: string;
  isRead: boolean;
  createdAt: string;
  resourceType?: string;
  resourceId?: string;
  actionUrl?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
}
