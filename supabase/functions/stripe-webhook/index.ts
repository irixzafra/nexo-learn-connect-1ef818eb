
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Stripe } from "https://esm.sh/stripe@12.6.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  httpClient: Stripe.createFetchHttpClient(),
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "No signature provided" }), {
      status: 400,
    });
  }

  try {
    const body = await req.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err.message);
      return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
        status: 400,
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle specific events
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, courseId } = session.metadata || {};

        if (!userId || !courseId) {
          console.error("Missing user or course ID in session metadata");
          break;
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
            console.error(`Failed to create enrollment: ${enrollmentError.message}`);
          }
        }

        // Create invoice record if payment is successful
        if (session.payment_status === "paid") {
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
            console.error(`Failed to create invoice: ${invoiceError.message}`);
          }
        }
        break;
      }

      case "payment_intent.succeeded": {
        // Handle successful payment intent
        console.log("Payment succeeded!");
        break;
      }

      case "payment_intent.payment_failed": {
        // Handle failed payment intent
        const paymentIntent = event.data.object;
        console.error(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(`❌ Error processing webhook:`, err);
    return new Response(JSON.stringify({ error: `Webhook error: ${err.message}` }), {
      status: 500,
    });
  }
});
