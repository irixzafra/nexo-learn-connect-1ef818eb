
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { SubscriptionPlan, UserSubscription } from "@/types/subscription";

export const useSubscription = () => {
  const { isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch subscription plans
  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setPlans(data || []);
    } catch (err: any) {
      console.error("Error fetching subscription plans:", err);
      setError(err);
    }
  };

  // Fetch user's active subscription
  const fetchUserSubscription = async () => {
    if (!isAuthenticated) {
      setSubscription(null);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('verify-subscription');

      if (error) throw error;
      
      setSubscription(data.subscription_details);
    } catch (err: any) {
      console.error("Error fetching user subscription:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) {
      throw new Error("No hay una suscripción activa para cancelar");
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: subscription.stripe_subscription_id }
      });

      if (error) throw error;

      // Update local state with cancel_at_period_end = true
      setSubscription({
        ...subscription,
        cancel_at_period_end: true
      });

      return { success: true };
    } catch (err: any) {
      console.error("Error cancelling subscription:", err);
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Resume subscription (cancel the cancellation)
  const resumeSubscription = async () => {
    if (!subscription?.stripe_subscription_id) {
      throw new Error("No hay una suscripción para reanudar");
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('resume-subscription', {
        body: { subscriptionId: subscription.stripe_subscription_id }
      });

      if (error) throw error;

      // Update local state with cancel_at_period_end = false
      setSubscription({
        ...subscription,
        cancel_at_period_end: false
      });

      return { success: true };
    } catch (err: any) {
      console.error("Error resuming subscription:", err);
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount or auth state change
  useEffect(() => {
    fetchPlans();
    if (isAuthenticated) {
      fetchUserSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    subscription,
    plans,
    isLoading,
    error,
    refetch: fetchUserSubscription,
    cancelSubscription,
    resumeSubscription
  };
};
