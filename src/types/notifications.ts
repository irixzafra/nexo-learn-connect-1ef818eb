
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: Date;
  user_id?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  is_read?: boolean;
  created_at?: string;
  content?: string;
  action_url?: string;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
}
