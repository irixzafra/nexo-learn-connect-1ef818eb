
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentMethod } from "@/types/payment";

export const usePaymentMethods = () => {
  const { isAuthenticated } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch user's payment methods
  const fetchPaymentMethods = async () => {
    if (!isAuthenticated) {
      setPaymentMethods([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (err: any) {
      console.error("Error fetching payment methods:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Set a payment method as default
  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsLoading(true);
    try {
      // First, set all payment methods as non-default
      await supabase
        .from('payment_methods')
        .update({ is_default: false })
        .neq('id', 'no_match'); // Update all rows

      // Then set the selected one as default
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_default: true })
        .eq('id', paymentMethodId);

      if (error) throw error;

      // Update local state
      setPaymentMethods(prevMethods => 
        prevMethods.map(method => ({
          ...method,
          is_default: method.id === paymentMethodId
        }))
      );

      return { success: true };
    } catch (err: any) {
      console.error("Error setting default payment method:", err);
      setError(err);
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount or auth state change
  useEffect(() => {
    if (isAuthenticated) {
      fetchPaymentMethods();
    } else {
      setPaymentMethods([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    paymentMethods,
    isLoading,
    error,
    refetch: fetchPaymentMethods,
    setDefaultPaymentMethod
  };
};
