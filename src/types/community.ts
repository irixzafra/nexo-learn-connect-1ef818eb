
export interface PostCategory {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  title?: string;
  category?: string;
  category_id?: string;
  media_urls?: any;
  is_pinned: boolean;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: {
    full_name: string;
    role: string;
    avatar_url?: string;
  };
  user_level?: {
    level_number: number;
    level_name: string;
    icon: string;
    color: string;
  };
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string;
  like_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: {
    full_name: string;
    role: string;
    avatar_url?: string;
  };
  user_level?: {
    level_number: number;
    level_name: string;
    icon: string;
    color: string;
  };
  replies?: PostComment[];
}

export interface PostLike {
  id: string;
  post_id?: string;
  comment_id?: string;
  user_id: string;
  created_at: string;
}

export interface UserLevel {
  id: string;
  level_number: number;
  name: string;
  description?: string;
  color: string;
  min_points: number;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  points: number;
  level: number;
  level_name: string;
  level_icon: string;
  level_color: string;
  rank: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  // Joined data
  sender?: {
    full_name: string;
    avatar_url?: string;
    role: string;
  };
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  participants: ConversationParticipant[];
  is_group: boolean;
  group_name?: string;
  group_avatar?: string;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  created_at: string;
  // Joined data
  profiles?: {
    full_name: string;
    avatar_url?: string;
    role: string;
  };
  is_online?: boolean;
}
