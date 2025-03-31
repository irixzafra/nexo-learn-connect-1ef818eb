
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Invoice } from '@/types/payment';
import { useToast } from '@/components/ui/use-toast';

export const useInvoices = (userId?: string) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('invoices')
          .select(`
            *,
            course:course_id (
              title
            ),
            subscription:subscription_id (
              subscription_plans (
                name
              )
            )
          `);
        
        // Add user filter if userId is provided
        if (userId) {
          query = query.eq('user_id', userId);
        }
        
        // Add status filter
        if (filter === 'paid') {
          query = query.eq('status', 'paid');
        } else if (filter === 'pending') {
          query = query.in('status', ['open', 'draft']);
        }
        
        // Order by created_at
        query = query.order('created_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Transform the data to conform to the Invoice type
        const processedInvoices: Invoice[] = (data || []).map(invoice => ({
          ...invoice,
          date: invoice.created_at ? new Date(invoice.created_at).toISOString() : new Date().toISOString(),
          currency: (invoice.currency as "usd" | "eur") || "usd"
        }));
        
        setInvoices(processedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar las facturas.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [toast, userId, filter]);

  return { invoices, isLoading, filter, setFilter };
};
