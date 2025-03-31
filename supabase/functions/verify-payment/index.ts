
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Stripe } from "https://esm.sh/stripe@12.6.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, userId, courseId } = await req.json();

    if (!sessionId || !userId || !courseId) {
      throw new Error("Missing required parameters");
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    // Check if the user is already enrolled in the course
    const { data: existingEnrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    // If not already enrolled, create the enrollment
    if (!existingEnrollment) {
      const { error: enrollmentError } = await supabase
        .from("enrollments")
        .insert({
          user_id: userId,
          course_id: courseId,
        });

      if (enrollmentError) {
        throw new Error(`Failed to create enrollment: ${enrollmentError.message}`);
      }
    }

    // Create invoice record
    const { error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        user_id: userId,
        course_id: courseId,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || "eur",
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_invoice_id: session.invoice,
      });

    if (invoiceError) {
      throw new Error(`Failed to create invoice: ${invoiceError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
