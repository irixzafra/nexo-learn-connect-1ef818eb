
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface RevenueData {
  day: string;
  total_revenue: number;
  transaction_count: number;
}

interface CourseRevenueData {
  course_id: string;
  course_title: string;
  total_revenue: number;
  transaction_count: number;
}

interface PlanSubscriptionData {
  plan_id: string;
  plan_name: string;
  subscriber_count: number;
  total_revenue: number;
}

interface PaymentStatistics {
  total_revenue: number;
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  revenue_last_30_days: number;
  transactions_last_30_days: number;
}

interface SubscriptionStatistics {
  total_subscriptions: number;
  active_subscriptions: number;
  canceled_subscriptions: number;
  trial_subscriptions: number;
  monthly_recurring_revenue: number;
  yearly_recurring_revenue: number;
}

export function useFinanceAnalytics(daysBack = 30) {
  // Query for payment statistics
  const { data: paymentStats, isLoading: isLoadingPaymentStats } = useQuery({
    queryKey: ['payment-statistics', daysBack],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_payment_statistics', {
        days_back: daysBack
      });
      
      if (error) throw error;
      return data as PaymentStatistics;
    }
  });

  // Query for revenue by day
  const { data: revenueByDay = [], isLoading: isLoadingRevenueByDay } = useQuery({
    queryKey: ['revenue-by-day', daysBack],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_by_day', {
        days_back: daysBack
      });
      
      if (error) throw error;
      return data as RevenueData[];
    }
  });

  // Query for revenue by course
  const { data: revenueByCourse = [], isLoading: isLoadingRevenueByCourse } = useQuery({
    queryKey: ['revenue-by-course'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_by_course');
      
      if (error) throw error;
      return data as CourseRevenueData[];
    }
  });

  // Query for subscription statistics
  const { data: subscriptionStats, isLoading: isLoadingSubscriptionStats } = useQuery({
    queryKey: ['subscription-statistics'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_subscription_statistics');
      
      if (error) throw error;
      return data as SubscriptionStatistics;
    }
  });

  // Query for subscriptions by plan
  const { data: subscriptionsByPlan = [], isLoading: isLoadingSubscriptionsByPlan } = useQuery({
    queryKey: ['subscriptions-by-plan'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_subscriptions_by_plan');
      
      if (error) throw error;
      return data as PlanSubscriptionData[];
    }
  });

  return {
    paymentStats: paymentStats || {
      total_revenue: 0,
      total_transactions: 0,
      successful_transactions: 0,
      failed_transactions: 0,
      revenue_last_30_days: 0,
      transactions_last_30_days: 0
    },
    revenueByDay,
    revenueByCourse,
    subscriptionStats: subscriptionStats || {
      total_subscriptions: 0,
      active_subscriptions: 0,
      canceled_subscriptions: 0,
      trial_subscriptions: 0,
      monthly_recurring_revenue: 0,
      yearly_recurring_revenue: 0
    },
    subscriptionsByPlan,
    isLoading: 
      isLoadingPaymentStats || 
      isLoadingRevenueByDay || 
      isLoadingRevenueByCourse || 
      isLoadingSubscriptionStats || 
      isLoadingSubscriptionsByPlan
  };
}
