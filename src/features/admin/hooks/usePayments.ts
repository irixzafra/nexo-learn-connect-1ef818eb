
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export interface Payment {
  id: string;
  user_id: string;
  course_id?: string | null;
  amount: number;
  currency: 'eur' | 'usd';
  status: 'pending' | 'succeeded' | 'failed';
  created_at: string;
  stripe_charge_id?: string | null;
  stripe_checkout_session_id?: string | null;
  user_full_name?: string;
  user_email?: string;
  course_title?: string;
}

export function usePayments() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Function to fetch payments with user and course details
  const fetchPayments = async () => {
    try {
      let query = supabase
        .from('payments')
        .select(`
          *,
          profiles(full_name, email),
          courses(title)
        `)
        .order('created_at', { ascending: false });

      // Apply filters if provided
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      if (dateRange.from) {
        const fromDate = format(dateRange.from, 'yyyy-MM-dd');
        query = query.gte('created_at', `${fromDate}T00:00:00`);
      }

      if (dateRange.to) {
        const toDate = format(dateRange.to, 'yyyy-MM-dd');
        query = query.lte('created_at', `${toDate}T23:59:59`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform data to include user and course details
      return data.map((payment) => ({
        ...payment,
        user_full_name: payment.profiles?.full_name || 'Unknown',
        user_email: payment.profiles?.email || 'No email',
        course_title: payment.courses?.title || 'N/A',
      })) as Payment[];
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  };

  // Query for fetching payments
  const { data: payments = [], isLoading, error, refetch } = useQuery({
    queryKey: ['payments', statusFilter, dateRange],
    queryFn: fetchPayments,
  });

  // Function to handle refunding a payment
  const initiateRefund = async (paymentId: string) => {
    try {
      // In a real implementation, this would call a Supabase Edge Function
      // that would use the Stripe API to process the refund
      toast({
        title: "Refund initiated",
        description: "The refund process has been started. This is a placeholder.",
      });
      
      // Placeholder for refund logic
      return true;
    } catch (error) {
      console.error('Error initiating refund:', error);
      toast({
        variant: "destructive",
        title: "Refund failed",
        description: "There was an error processing the refund.",
      });
      return false;
    }
  };

  // Filter payments based on search term
  const filteredPayments = payments.filter(payment => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      payment.user_full_name?.toLowerCase().includes(searchLower) ||
      payment.user_email?.toLowerCase().includes(searchLower) ||
      payment.course_title?.toLowerCase().includes(searchLower) ||
      payment.id.toLowerCase().includes(searchLower) ||
      (payment.stripe_charge_id && payment.stripe_charge_id.toLowerCase().includes(searchLower))
    );
  });

  return {
    payments: filteredPayments,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    refetch,
    initiateRefund,
  };
}
