
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Invoice } from '@/types/payment';
import { useToast } from '@/components/ui/use-toast';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
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
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setInvoices(data || []);
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
  }, [toast]);

  return { invoices, isLoading };
};
