
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UseStripeCheckoutProps {
  successUrl: string;
  cancelUrl: string;
}

export const useStripeCheckout = ({ successUrl, cancelUrl }: UseStripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Checkout for a one-time course purchase
  const checkoutCourse = async (courseId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          itemType: 'course',
          itemId: courseId,
          successUrl,
          cancelUrl
        }
      });

      if (error) throw error;
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (error: any) {
      console.error("Error al crear la sesión de pago:", error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al procesar el pago",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Checkout for a subscription plan
  const checkoutSubscription = async (planId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          itemType: 'subscription',
          itemId: planId,
          successUrl,
          cancelUrl
        }
      });

      if (error) throw error;
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (error: any) {
      console.error("Error al crear la sesión de suscripción:", error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al procesar la suscripción",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return {
    checkoutCourse,
    checkoutSubscription,
    isLoading
  };
};
