
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  stripe_price_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  subscription_plans?: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}
