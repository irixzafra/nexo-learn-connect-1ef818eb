
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Invoice } from "@/types/payment";

export const useInvoices = () => {
  const { isAuthenticated } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch user's invoices
  const fetchInvoices = async () => {
    if (!isAuthenticated) {
      setInvoices([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          course:course_id(title),
          subscription:subscription_id(subscription_plans(name))
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (err: any) {
      console.error("Error fetching invoices:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Download invoice PDF
  const downloadInvoice = async (invoiceUrl: string) => {
    window.open(invoiceUrl, '_blank');
  };

  // Load data on component mount or auth state change
  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices();
    } else {
      setInvoices([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    invoices,
    isLoading,
    error,
    refetch: fetchInvoices,
    downloadInvoice
  };
};
