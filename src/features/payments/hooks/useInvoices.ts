
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Invoice } from '@/types/payment';
import { useToast } from '@/components/ui/use-toast';
import { InvoiceProps } from '@/features/payments/components/invoice/InvoiceCard';

export const useInvoices = (userId?: string) => {
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);
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
        
        // Transform the data to conform to the InvoiceProps type
        const processedInvoices: InvoiceProps[] = (data || []).map(invoice => ({
          id: invoice.id,
          invoiceNumber: `INV-${invoice.id.slice(0, 8).toUpperCase()}`,
          amount: invoice.amount,
          currency: (invoice.currency as "usd" | "eur") || "eur",
          status: mapInvoiceStatus(invoice.status),
          date: invoice.created_at,
          courseName: invoice.course?.title || (invoice.subscription?.subscription_plans?.name || 'Subscription'),
          pdfUrl: invoice.pdf_url || undefined,
          invoiceUrl: invoice.invoice_url || undefined
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

  // Helper function to map database status to UI status
  const mapInvoiceStatus = (status: string): 'paid' | 'pending' | 'failed' => {
    if (status === 'paid') return 'paid';
    if (status === 'void' || status === 'uncollectible') return 'failed';
    return 'pending'; // 'open', 'draft'
  };
  
  // Function to download invoice
  const downloadInvoice = async (invoiceId: string) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('pdf_url')
        .eq('id', invoiceId)
        .single();
      
      if (error) throw error;
      
      if (data && data.pdf_url) {
        window.open(data.pdf_url, '_blank');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se encontró el PDF de la factura.",
        });
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al descargar la factura.",
      });
    }
  };

  return { invoices, isLoading, filter, setFilter, downloadInvoice };
};
