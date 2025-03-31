
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Invoice } from "@/types/payment";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("invoices")
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
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las facturas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoice: Invoice) => {
    if (!invoice.pdf_url) {
      toast({
        title: "Error",
        description: "No hay un PDF disponible para esta factura",
        variant: "destructive",
      });
      return;
    }

    // Open the PDF URL in a new tab
    window.open(invoice.pdf_url, "_blank");
  };

  return {
    invoices,
    isLoading,
    fetchInvoices,
    downloadInvoice
  };
};
