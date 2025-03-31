
export type BadgeType = 'achievement' | 'course' | 'activity' | 'community' | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  badge_type: BadgeType;
  points: number;
  requirements?: Record<string, any>;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  badge?: Badge;
  awarded_at: string;
}

export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  points_history?: {
    amount: number;
    reason: string;
    source: string;
    timestamp: string;
  }[];
}
