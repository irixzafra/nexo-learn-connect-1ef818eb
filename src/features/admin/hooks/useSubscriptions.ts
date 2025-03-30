
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  stripe_subscription_id: string | null;
  user_full_name?: string;
  user_email?: string;
  plan_name?: string;
  plan_price?: number;
  plan_interval?: string;
}

export function useSubscriptions() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Function to fetch subscriptions with user and plan details
  const fetchSubscriptions = async () => {
    try {
      let query = supabase
        .from('user_subscriptions')
        .select(`
          *,
          profiles(full_name, email),
          subscription_plans(name, price, interval)
        `)
        .order('created_at', { ascending: false });

      // Apply status filter if provided
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform data to include user and plan details
      return data.map((subscription) => ({
        ...subscription,
        user_full_name: subscription.profiles?.full_name || 'Unknown',
        user_email: subscription.profiles?.email || 'No email',
        plan_name: subscription.subscription_plans?.name || 'Unknown Plan',
        plan_price: subscription.subscription_plans?.price || 0,
        plan_interval: subscription.subscription_plans?.interval || 'unknown',
      })) as Subscription[];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  };

  // Query for fetching subscriptions
  const { data: subscriptions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['subscriptions', statusFilter],
    queryFn: fetchSubscriptions,
  });

  // Function to handle cancelling a subscription
  const cancelSubscription = async (subscriptionId: string) => {
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // that would use the Stripe API to cancel the subscription
      toast({
        title: "Subscription cancelled",
        description: "The subscription has been cancelled. This is a placeholder.",
      });
      
      // Placeholder for cancel logic
      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        variant: "destructive",
        title: "Cancellation failed",
        description: "There was an error cancelling the subscription.",
      });
      return false;
    }
  };

  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      subscription.user_full_name?.toLowerCase().includes(searchLower) ||
      subscription.user_email?.toLowerCase().includes(searchLower) ||
      subscription.plan_name?.toLowerCase().includes(searchLower) ||
      (subscription.stripe_subscription_id && 
       subscription.stripe_subscription_id.toLowerCase().includes(searchLower))
    );
  });

  return {
    subscriptions: filteredSubscriptions,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refetch,
    cancelSubscription,
  };
}
