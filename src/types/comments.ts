
export interface Comment {
  id: string;
  user_id: string;
  lesson_id: string;
  content: string;
  parent_comment_id: string | null;
  created_at: string;
  updated_at: string;
  // Additional fields from join queries
  user_name?: string;
}

export interface CommentWithReplies extends Comment {
  replies?: Comment[];
}
