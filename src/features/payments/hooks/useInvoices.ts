
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { InvoiceProps } from '../components/invoice/InvoiceCard';

export const useInvoices = (userId?: string) => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const { data: invoices = [], isLoading, error, refetch } = useQuery({
    queryKey: ['userInvoices', userId, filter],
    queryFn: async () => {
      try {
        if (!userId) return [];

        console.log("Fetching invoices for user:", userId, "with filter:", filter);

        let query = supabase
          .from('invoices')
          .select(`
            id,
            amount,
            currency,
            status,
            paid_at,
            created_at,
            course_id,
            pdf_url,
            invoice_url,
            courses(title)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data.map((invoice) => ({
          id: invoice.id,
          amount: invoice.amount,
          currency: invoice.currency as 'eur' | 'usd',
          status: invoice.status as 'paid' | 'pending' | 'failed',
          date: invoice.paid_at || invoice.created_at,
          courseName: invoice.courses?.title || undefined,
          pdfUrl: invoice.pdf_url || undefined,
          invoiceUrl: invoice.invoice_url || undefined,
        })) as InvoiceProps[];
      } catch (error: any) {
        console.error("Error fetching invoices:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las facturas",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!userId,
  });

  return {
    invoices,
    isLoading,
    error,
    filter,
    setFilter,
    refetch,
  };
};
